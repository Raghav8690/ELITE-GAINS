"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2, Send, Phone, Mail, MapPin } from "lucide-react";
import { submitContactForm } from "@/app/actions/contact";
import { SITE_CONFIG } from "@/lib/data";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email"),
  goal: z.string().min(1, "Please select a fitness goal"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof schema>;

const FITNESS_GOALS = [
  "Weight Loss",
  "Muscle Building",
  "Athletic Performance",
  "General Fitness",
  "Powerlifting",
  "Rehabilitation & Recovery",
  "Nutrition & Diet",
];

export default function ContactSection() {
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    const formData = new FormData();
    Object.entries(data).forEach(([k, v]) => formData.append(k, v));

    startTransition(async () => {
      const result = await submitContactForm(null, formData);
      if (result.success) {
        setSuccess(true);
        reset();
      }
    });
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-black overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px section-divider opacity-30" />

      {/* BG glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-yellow-500/5 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-10 bg-yellow-500" />
              <span className="section-tag">GET IN TOUCH</span>
            </div>
            <h2 className="font-heading text-[clamp(3rem,6vw,5rem)] leading-[0.95] text-white mb-6">
              READY TO<br />
              <span className="text-yellow-500">EVOLVE?</span>
            </h2>
            <p className="text-white/60 leading-relaxed mb-10">
              Drop us a message and our performance consultants will get back to you within
              24 hours to discuss how we can help you reach your goals.
            </p>

            {/* Contact details */}
            <div className="space-y-5">
              {[
                { icon: Phone, label: "Phone", value: SITE_CONFIG.phone, href: `tel:${SITE_CONFIG.phone}` },
                { icon: Mail, label: "Email", value: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` },
                { icon: MapPin, label: "Address", value: SITE_CONFIG.address, href: "#" },
              ].map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-500/20 transition-colors">
                    <Icon size={16} className="text-yellow-500" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs tracking-widest uppercase">{label}</div>
                    <div className="text-white/80 text-sm mt-0.5">{value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${SITE_CONFIG.whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 mt-10 bg-[#25D366]/10 border border-[#25D366]/30 px-5 py-3 hover:bg-[#25D366]/20 transition-colors group"
            >
              {/* WhatsApp icon */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="#25D366"
                className="flex-shrink-0"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.087.536 4.049 1.477 5.756L0 24l6.435-1.453A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.822 0-3.53-.487-4.996-1.338l-.357-.213-3.713.839.838-3.619-.232-.369A9.951 9.951 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              <div>
                <div className="text-[#25D366] font-semibold text-sm">Chat on WhatsApp</div>
                <div className="text-white/40 text-xs">Usually replies within minutes</div>
              </div>
            </a>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-glass border border-yellow-500/20 p-12 text-center h-full flex flex-col items-center justify-center min-h-[500px]"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                  >
                    <CheckCircle size={64} className="text-yellow-500 mx-auto mb-6" />
                  </motion.div>
                  <h3 className="font-heading text-4xl text-white mb-3">MESSAGE SENT!</h3>
                  <p className="text-white/60 mb-8 leading-relaxed">
                    Your details have been saved and our team will reach out within 24 hours.
                    We've also saved your inquiry to follow up personally.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="btn-outline text-sm"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  className="bg-glass border border-yellow-500/10 p-8 md:p-10"
                >
                  <h3 className="font-heading text-2xl text-white mb-6 tracking-wide">
                    SEND A MESSAGE
                  </h3>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                    {/* Name */}
                    <div>
                      <label className="text-white/50 text-xs tracking-widest uppercase block mb-2">
                        Full Name *
                      </label>
                      <input
                        {...register("name")}
                        placeholder="John Smith"
                        className={`form-input w-full bg-white/5 border ${
                          errors.name ? "border-red-500/60" : "border-white/10"
                        } text-white placeholder:text-white/20 px-4 py-3 text-sm transition-all`}
                      />
                      {errors.name && (
                        <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Phone + Email row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-white/50 text-xs tracking-widest uppercase block mb-2">
                          Phone *
                        </label>
                        <input
                          {...register("phone")}
                          type="tel"
                          placeholder="+91 98765 43210"
                          className={`form-input w-full bg-white/5 border ${
                            errors.phone ? "border-red-500/60" : "border-white/10"
                          } text-white placeholder:text-white/20 px-4 py-3 text-sm transition-all`}
                        />
                        {errors.phone && (
                          <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="text-white/50 text-xs tracking-widest uppercase block mb-2">
                          Email *
                        </label>
                        <input
                          {...register("email")}
                          type="email"
                          placeholder="john@email.com"
                          className={`form-input w-full bg-white/5 border ${
                            errors.email ? "border-red-500/60" : "border-white/10"
                          } text-white placeholder:text-white/20 px-4 py-3 text-sm transition-all`}
                        />
                        {errors.email && (
                          <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Goal */}
                    <div>
                      <label className="text-white/50 text-xs tracking-widest uppercase block mb-2">
                        Fitness Goal *
                      </label>
                      <select
                        {...register("goal")}
                        className={`form-input w-full bg-dark-600 border ${
                          errors.goal ? "border-red-500/60" : "border-white/10"
                        } text-white px-4 py-3 text-sm transition-all`}
                      >
                        <option value="" className="bg-dark-700">Select your goal...</option>
                        {FITNESS_GOALS.map((g) => (
                          <option key={g} value={g} className="bg-dark-700">
                            {g}
                          </option>
                        ))}
                      </select>
                      {errors.goal && (
                        <p className="text-red-400 text-xs mt-1">{errors.goal.message}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="text-white/50 text-xs tracking-widest uppercase block mb-2">
                        Message *
                      </label>
                      <textarea
                        {...register("message")}
                        rows={4}
                        placeholder="Tell us about your fitness goals, experience level, or any questions..."
                        className={`form-input w-full bg-white/5 border ${
                          errors.message ? "border-red-500/60" : "border-white/10"
                        } text-white placeholder:text-white/20 px-4 py-3 text-sm resize-none transition-all`}
                      />
                      {errors.message && (
                        <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>
                      )}
                    </div>

                    <p className="text-white/25 text-xs">
                      📊 Your details will be saved securely for our team to follow up.
                    </p>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isPending}
                      className="btn-glow w-full flex items-center justify-center gap-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <span>
                        {isPending ? (
                          <>
                            <Loader2 size={16} className="animate-spin inline mr-2" />
                            SENDING...
                          </>
                        ) : (
                          <>
                            <Send size={14} className="inline mr-2" />
                            SEND MESSAGE
                          </>
                        )}
                      </span>
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
