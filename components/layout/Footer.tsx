"use client";

import { motion } from "framer-motion";
import { Instagram, Facebook, Youtube, Twitter, MapPin, Phone, Mail, Clock } from "lucide-react";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-800 border-t border-yellow-500/10 relative overflow-hidden">
      {/* Animated gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] overflow-hidden">
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-yellow-500 to-transparent"
        />
      </div>

      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-yellow-500/3 blur-[100px] pointer-events-none" />

      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 bg-yellow-500 flex items-center justify-center relative overflow-hidden">
                <span className="font-heading text-black text-lg leading-none relative z-10">ORM</span>
              </div>
              <span className="font-heading text-xl tracking-widest text-white">
                ONE <span className="text-yellow-500">REP MAX</span>
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              The pinnacle of high-performance training. Built for athletes who demand excellence
              in every rep, every session, every day.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: SITE_CONFIG.socialLinks.instagram, label: "Instagram" },
                { icon: Facebook, href: SITE_CONFIG.socialLinks.facebook, label: "Facebook" },
                { icon: Youtube, href: SITE_CONFIG.socialLinks.youtube, label: "YouTube" },
                { icon: Twitter, href: SITE_CONFIG.socialLinks.twitter, label: "Twitter" },
              ].map(({ icon: Icon, href, label }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  whileHover={{ y: -3 }}
                  className="w-9 h-9 bg-glass border border-white/10 flex items-center justify-center text-white/50 hover:text-yellow-500 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,193,7,0.2)]"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h4 className="font-heading tracking-widest text-white text-lg mb-5">
              QUICK NAVIGATION
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                >
                  <a
                    href={link.href}
                    className="text-white/50 text-sm hover:text-yellow-500 transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-4 h-[1px] bg-yellow-500/30 group-hover:bg-yellow-500 group-hover:w-6 transition-all duration-300" />
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + NAV_LINKS.length * 0.05 }}
              >
                <a
                  href="#contact"
                  className="text-white/50 text-sm hover:text-yellow-500 transition-all duration-300 flex items-center gap-2 group"
                >
                  <span className="w-4 h-[1px] bg-yellow-500/30 group-hover:bg-yellow-500 group-hover:w-6 transition-all duration-300" />
                  Contact
                </a>
              </motion.li>
            </ul>
          </motion.div>

          {/* Member Support */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h4 className="font-heading tracking-widest text-white text-lg mb-5">
              MEMBER SUPPORT
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <MapPin size={15} className="text-yellow-500 mt-0.5 flex-shrink-0" />
                <span className="text-white/50 text-sm leading-relaxed">{SITE_CONFIG.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-center gap-3 text-white/50 text-sm hover:text-yellow-500 transition-colors"
                >
                  <Phone size={15} className="text-yellow-500 flex-shrink-0" />
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-3 text-white/50 text-sm hover:text-yellow-500 transition-colors"
                >
                  <Mail size={15} className="text-yellow-500 flex-shrink-0" />
                  {SITE_CONFIG.email}
                </a>
              </li>
            </ul>

            {/* Opening Hours */}
            <div className="mt-6 pt-5 border-t border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <Clock size={13} className="text-yellow-500" />
                <span className="text-yellow-500 text-xs font-semibold tracking-widest uppercase">
                  Opening Hours
                </span>
              </div>
              <ul className="space-y-1.5 text-sm">
                <li className="flex justify-between">
                  <span className="text-white/40">Mon–Fri</span>
                  <span className="text-white/70">{SITE_CONFIG.openingHours.weekdays}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-white/40">Saturday</span>
                  <span className="text-white/70">{SITE_CONFIG.openingHours.saturday}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-white/40">Sunday</span>
                  <span className="text-white/70">{SITE_CONFIG.openingHours.sunday}</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Google Maps Embed */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h4 className="font-heading tracking-widest text-white text-lg mb-5">FIND US</h4>
            <div className="relative overflow-hidden rounded-sm border border-yellow-500/20 h-48 group">
              <iframe
                src={SITE_CONFIG.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(100%) invert(90%) contrast(90%)" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="One Rep Max Location"
              />
              {/* Hover glow */}
              <div className="absolute inset-0 border border-transparent group-hover:border-yellow-500/30 transition-all duration-500 pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 relative z-10">
        <div className="container mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">
            © {currentYear} ONE REP MAX. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/30 text-xs hover:text-yellow-500/60 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/30 text-xs hover:text-yellow-500/60 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-white/30 text-xs hover:text-yellow-500/60 transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
