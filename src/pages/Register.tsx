import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Check, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { sendToSheets } from "@/lib/sheets";
import { useLang } from "@/i18n/LangContext";

import registerBg from "@assets/5E2F4A3F-1A1B-41B1-8AF6-70F7BEAA637D_1778701721058.png";

const formSchema = z.object({
  fullName:       z.string().min(3, { message: "الاسم الكامل مطلوب" }),
  phone:          z.string().min(10, { message: "رقم الهاتف غير صالح" }),
  age:            z.string().min(2, { message: "العمر مطلوب" }),
  wilaya:         z.string().min(2, { message: "الولاية مطلوبة" }),
  educationLevel: z.string().min(1, { message: "المستوى الدراسي مطلوب" }),
  languages:      z.string().min(1, { message: "اللغات مطلوبة" }),
  height:         z.string().min(2, { message: "الطول مطلوب بالسنتيمتر" }),
  isHijabi:       z.string().optional(),
  program:        z.string().min(1, { message: "يجب اختيار برنامج" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Register() {
  const { t } = useLang();
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "", phone: "", age: "", wilaya: "",
      educationLevel: "", languages: "",
      height: "", isHijabi: "no",
      program: "",
    },
  });

  const steps = [
    { title: "المعلومات الشخصية", id: 1 },
    { title: "معلومات التعليم",   id: 2 },
    { title: "المعلومات الجسدية", id: 3 },
    { title: "اختيار التخصص",    id: 4 },
    { title: "التأكيد",           id: 5 },
  ];

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormValues)[] = [];
    if (step === 1) fieldsToValidate = ["fullName", "phone", "age", "wilaya"];
    else if (step === 2) fieldsToValidate = ["educationLevel", "languages"];
    else if (step === 3) fieldsToValidate = ["height", "isHijabi"];
    else if (step === 4) fieldsToValidate = ["program"];
    const isValid = await form.trigger(fieldsToValidate as any);
    if (isValid) setStep((prev) => Math.min(prev + 1, 5));
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    const ok = await sendToSheets({
      type: "register",
      ...data,
      submittedAt: new Date().toLocaleString("ar-DZ"),
    });
    setIsSubmitting(false);
    if (ok) {
      setIsSubmitted(true);
      toast({ title: "تم استلام طلبك بنجاح", description: t.register.success_msg });
    } else {
      toast({ title: "حدث خطأ", description: "يرجى المحاولة مرة أخرى.", variant: "destructive" });
    }
  };

  const programs = [
    { value: "css",         label: "مضيف/ة طيران (CSS)" },
    { value: "dispatcher",  label: "مرحّل جوي (Flight Dispatcher)" },
    { value: "agent",       label: "وكيل مطار (Ground Agent)" },
    { value: "maintenance", label: "مهندس صيانة طائرات (AME)" },
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#060d1a] flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
          className="text-center max-w-md">
          <div className="w-24 h-24 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12 text-[#d4af37]" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">تم التسجيل بنجاح!</h2>
          <p className="text-white/60 text-lg leading-relaxed mb-8">{t.register.success_msg}</p>
          <a href="/">
            <motion.span whileHover={{ scale: 1.04 }}
              className="inline-flex items-center gap-2 bg-[#d4af37] text-[#060d1a] font-bold px-10 py-4 rounded-full cursor-pointer">
              العودة للرئيسية
            </motion.span>
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060d1a] pt-28 pb-16 px-5">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#d4af37]/50 text-xs tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>Registration</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">التسجيل</h1>
          <p className="text-white/45">أكمل النموذج للتقدم للدخول إلى معهد جلنار</p>
        </div>

        {/* Progress bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            {steps.map((s) => (
              <div key={s.id} className="flex flex-col items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  step > s.id
                    ? "bg-[#d4af37] text-[#060d1a]"
                    : step === s.id
                      ? "bg-[#d4af37]/20 border-2 border-[#d4af37] text-[#d4af37]"
                      : "bg-white/5 border border-white/10 text-white/30"
                }`}>
                  {step > s.id ? <Check size={14} /> : s.id}
                </div>
                <span className={`text-[10px] hidden md:block transition-colors ${step === s.id ? "text-[#d4af37]" : "text-white/25"}`}>
                  {s.title}
                </span>
              </div>
            ))}
          </div>
          <div className="h-1 bg-white/6 rounded-full">
            <motion.div className="h-full bg-[#d4af37] rounded-full" animate={{ width: `${((step - 1) / 4) * 100}%` }} transition={{ duration: 0.4 }} />
          </div>
        </div>

        {/* Form card */}
        <div className="bg-white/[0.02] border border-white/6 rounded-3xl p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <AnimatePresence mode="wait">
                {/* STEP 1 */}
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}>
                    <h3 className="text-xl font-bold text-white mb-6">المعلومات الشخصية</h3>
                    <div className="space-y-5">
                      <FormField control={form.control} name="fullName" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/70">الاسم الكامل *</FormLabel>
                          <FormControl><Input {...field} className="bg-white/[0.04] border-white/10 text-white placeholder:text-white/20 rounded-xl focus:border-[#d4af37]/40" placeholder="الاسم واللقب" /></FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/70">رقم الهاتف *</FormLabel>
                          <FormControl><Input {...field} dir="ltr" className="bg-white/[0.04] border-white/10 text-white placeholder:text-white/20 rounded-xl focus:border-[#d4af37]/40" placeholder="+213 7XX XX XX XX" /></FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )} />
                      <div className="grid grid-cols-2 gap-5">
                        <FormField control={form.control} name="age" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/70">العمر *</FormLabel>
                            <FormControl><Input {...field} type="number" dir="ltr" className="bg-white/[0.04] border-white/10 text-white placeholder:text-white/20 rounded-xl focus:border-[#d4af37]/40" placeholder="مثال: 22" /></FormControl>
                            <FormMessage className="text-red-400 text-xs" />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="wilaya" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/70">الولاية *</FormLabel>
                            <FormControl><Input {...field} className="bg-white/[0.04] border-white/10 text-white placeholder:text-white/20 rounded-xl focus:border-[#d4af37]/40" placeholder="مثال: الجزائر" /></FormControl>
                            <FormMessage className="text-red-400 text-xs" />
                          </FormItem>
                        )} />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}>
                    <h3 className="text-xl font-bold text-white mb-6">معلومات التعليم</h3>
                    <div className="space-y-5">
                      <FormField control={form.control} name="educationLevel" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/70">المستوى الدراسي *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-white/[0.04] border-white/10 text-white rounded-xl focus:border-[#d4af37]/40">
                                <SelectValue placeholder="اختر مستواك الدراسي" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-[#0d1b2e] border-white/10 text-white">
                              {["3ème Collège", "BEM", "نهائي", "بكالوريا", "ليسانس فأكثر"].map(v => (
                                <SelectItem key={v} value={v} className="focus:bg-[#d4af37]/10 focus:text-[#d4af37]">{v}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="languages" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/70">اللغات التي تتقنها *</FormLabel>
                          <FormControl><Input {...field} className="bg-white/[0.04] border-white/10 text-white placeholder:text-white/20 rounded-xl focus:border-[#d4af37]/40" placeholder="مثال: العربية، الفرنسية، الإنجليزية" /></FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )} />
                    </div>
                  </motion.div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}>
                    <h3 className="text-xl font-bold text-white mb-6">المعلومات الجسدية</h3>
                    <div className="space-y-5">
                      <FormField control={form.control} name="height" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/70">الطول (سم) *</FormLabel>
                          <FormControl><Input {...field} type="number" dir="ltr" className="bg-white/[0.04] border-white/10 text-white placeholder:text-white/20 rounded-xl focus:border-[#d4af37]/40" placeholder="مثال: 168" /></FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="isHijabi" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/70">هل ترتدين الحجاب؟</FormLabel>
                          <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-6 mt-2">
                              <div className="flex items-center gap-2">
                                <RadioGroupItem value="yes" id="yes" className="border-white/20 text-[#d4af37]" />
                                <label htmlFor="yes" className="text-white/70 cursor-pointer">نعم</label>
                              </div>
                              <div className="flex items-center gap-2">
                                <RadioGroupItem value="no" id="no" className="border-white/20 text-[#d4af37]" />
                                <label htmlFor="no" className="text-white/70 cursor-pointer">لا</label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                        </FormItem>
                      )} />
                    </div>
                  </motion.div>
                )}

                {/* STEP 4 */}
                {step === 4 && (
                  <motion.div key="step4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}>
                    <h3 className="text-xl font-bold text-white mb-6">اختيار التخصص</h3>
                    <FormField control={form.control} name="program" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/70">البرنامج المطلوب *</FormLabel>
                        <div className="grid gap-3 mt-2">
                          {programs.map((p) => (
                            <div key={p.value}
                              onClick={() => field.onChange(p.value)}
                              className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                                field.value === p.value
                                  ? "border-[#d4af37]/50 bg-[#d4af37]/8 text-white"
                                  : "border-white/8 bg-white/[0.02] text-white/60 hover:border-white/20"
                              }`}>
                              <div className="flex items-center gap-3">
                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${field.value === p.value ? "border-[#d4af37]" : "border-white/20"}`}>
                                  {field.value === p.value && <div className="w-2 h-2 rounded-full bg-[#d4af37]" />}
                                </div>
                                <span className="font-medium">{p.label}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <FormMessage className="text-red-400 text-xs" />
                      </FormItem>
                    )} />
                  </motion.div>
                )}

                {/* STEP 5 — Confirm */}
                {step === 5 && (
                  <motion.div key="step5" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}>
                    <h3 className="text-xl font-bold text-white mb-6">مراجعة وتأكيد</h3>
                    <div className="space-y-3 bg-white/[0.02] rounded-2xl p-6 border border-white/6">
                      {[
                        { label: "الاسم",            value: form.getValues("fullName") },
                        { label: "الهاتف",           value: form.getValues("phone") },
                        { label: "العمر",             value: form.getValues("age") },
                        { label: "الولاية",          value: form.getValues("wilaya") },
                        { label: "المستوى الدراسي",  value: form.getValues("educationLevel") },
                        { label: "اللغات",           value: form.getValues("languages") },
                        { label: "الطول",            value: `${form.getValues("height")} سم` },
                        { label: "البرنامج",         value: programs.find(p => p.value === form.getValues("program"))?.label || "" },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                          <span className="text-white/40 text-sm">{label}</span>
                          <span className="text-white font-medium text-sm">{value}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation buttons */}
              <div className="flex justify-between items-center pt-4">
                {step > 1 ? (
                  <Button type="button" onClick={prevStep} variant="outline"
                    className="border-white/15 text-white/70 hover:text-white hover:border-white/30 rounded-xl px-6">
                    <ChevronRight className="w-4 h-4 ml-2" /> السابق
                  </Button>
                ) : <div />}

                {step < 5 ? (
                  <Button type="button" onClick={nextStep}
                    className="bg-[#d4af37] text-[#060d1a] font-bold px-8 rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                    التالي <ChevronLeft className="w-4 h-4 mr-2" />
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting}
                    className="bg-[#d4af37] text-[#060d1a] font-bold px-8 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-shadow rounded-xl">
                    {isSubmitting ? (
                      <><span className="w-4 h-4 border-2 border-[#060d1a]/30 border-t-[#060d1a] rounded-full animate-spin mr-2" /> جارٍ الإرسال...</>
                    ) : (
                      <><CheckCircle2 className="w-4 h-4 mr-2" /> تأكيد وإرسال</>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
