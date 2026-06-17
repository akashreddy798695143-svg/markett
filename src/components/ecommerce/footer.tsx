'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  MapPin,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ArrowRight,
  CreditCard,
  Smartphone,
  QrCode,
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
  Send,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useNavigationStore, type InfoPage } from '@/store/navigation-store'

const quickLinks: { label: string; page: InfoPage }[] = [
  { label: 'About Us', page: 'about' },
  { label: 'Contact Us', page: 'contact' },
  { label: 'Careers', page: 'careers' },
  { label: 'Blog', page: 'blog' },
  { label: 'Press', page: 'press' },
]

const customerService: { label: string; page: InfoPage | 'track' }[] = [
  { label: 'Help Center', page: 'help' },
  { label: 'Returns & Refunds', page: 'returns' },
  { label: 'Shipping Info', page: 'shipping' },
  { label: 'FAQ', page: 'faq' },
  { label: 'Track Order', page: 'track' },
]

const policies: { label: string; page: InfoPage }[] = [
  { label: 'Privacy Policy', page: 'privacy' },
  { label: 'Terms of Service', page: 'terms' },
  { label: 'Refund Policy', page: 'refund-policy' },
  { label: 'Sitemap', page: 'sitemap' },
  { label: 'Cookie Policy', page: 'cookies' },
]

const COMPANY_EMAIL = 'akashreddy798695143@gmail.com'
const COMPANY_PHONE = '+91 8790401013'
const COMPANY_PHONE_RAW = '8790401013'
const COMPANY_LOCATION = 'Tirupati, Chittoor Dist, Andhra Pradesh, India'

const socialLinks = [
  { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100035443847546' },
  { icon: Twitter, label: 'Twitter', href: 'https://x.com/akashreddyyy' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/akash_reddy_1430?igsh=MWtxZWtiejdwNXNtYg==' },
  { icon: Youtube, label: 'YouTube', href: 'https://youtube.com/@akashreddy7526?si=0N-SDVFeZVMIRI3y' },
]

const paymentMethods = [
  { label: 'Visa', icon: CreditCard },
  { label: 'Mastercard', icon: CreditCard },
  { label: 'UPI', icon: Smartphone },
  { label: 'PayPal', icon: CreditCard },
  { label: 'Apple Pay', icon: Smartphone },
  { label: 'Google Pay', icon: Smartphone },
]

const features = [
  { icon: Truck, label: 'Free Shipping', desc: 'On orders over $50' },
  { icon: RotateCcw, label: 'Easy Returns', desc: '30-day return policy' },
  { icon: ShieldCheck, label: 'Secure Payment', desc: '100% secure checkout' },
  { icon: Headphones, label: '24/7 Support', desc: 'Dedicated help center' },
]

export function Footer() {
  const navigate = useNavigationStore((s) => s.navigate)
  const navigateToInfo = useNavigationStore((s) => s.navigateToInfo)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = () => {
    if (email.trim() && email.includes('@')) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="bg-zinc-900 dark:bg-zinc-950 text-zinc-300">
      {/* Feature Bar - Same as yours */}
      <div className="border-b border-zinc-800">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {features.map((feature) => (
              <div key={feature.label} className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <feature.icon className="size-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{feature.label}</p>
                  <p className="text-xs text-zinc-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative size-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                <span className="text-white font-black text-base">S</span>
              </div>
              <p className="text-lg font-black text-white leading-none">Shop<span className="text-emerald-400">Zone</span></p>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed mb-5">
              Your one-stop destination for premium products.
            </p>
<<<<<<< HEAD
            <div className="flex flex-col gap-2 mb-5">
              <a href={`mailto:${COMPANY_EMAIL}`} className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-emerald-400 transition-colors">
                <Mail className="size-3.5" />
                <span className="break-all">{COMPANY_EMAIL}</span>
              </a>
              <a href={`tel:${COMPANY_PHONE_RAW}`} className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-emerald-400 transition-colors">
                <Phone className="size-3.5" />
                <span>{COMPANY_PHONE}</span>
              </a>
              <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                <MapPin className="size-3.5" />
                <span>{COMPANY_LOCATION}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="size-9 rounded-lg bg-zinc-800 hover:bg-emerald-600 flex items-center justify-center transition-colors group"
                  aria-label={social.label}
                >
                  <social.icon className="size-4 text-zinc-400 group-hover:text-white transition-colors" />
                </motion.a>
              ))}
            </div>
=======
>>>>>>> 727986fe0e8dccab0979cf37066d6e3ac22d8297
          </div>

          {/* Column 2, 3, 4 */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.page}>
<<<<<<< HEAD
                  <button
                    onClick={() => navigateToInfo(link.page)}
                    className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="size-3 text-zinc-600 group-hover:text-emerald-400 transition-colors" />
                    {link.label}
=======
                  <button onClick={() => navigateToInfo(link.page)} className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                    <ArrowRight className="size-3" /> {link.label}
>>>>>>> 727986fe0e8dccab0979cf37066d6e3ac22d8297
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Customer Service</h3>
            <ul className="space-y-2.5">
              {customerService.map((link) => (
                <li key={link.page}>
<<<<<<< HEAD
                  <button
                    onClick={() => {
                      if (link.page === 'track') {
                        navigate('user-dashboard', { tab: 'orders' })
                      } else {
                        navigateToInfo(link.page)
                      }
                    }}
                    className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="size-3 text-zinc-600 group-hover:text-emerald-400 transition-colors" />
                    {link.label}
=======
                  <button onClick={() => link.page === 'track' ? navigate('user-dashboard', { tab: 'orders' }) : navigateToInfo(link.page as InfoPage)} className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                    <ArrowRight className="size-3" /> {link.label}
>>>>>>> 727986fe0e8dccab0979cf37066d6e3ac22d8297
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Policies</h3>
            <ul className="space-y-2.5">
              {policies.map((link) => (
                <li key={link.page}>
<<<<<<< HEAD
                  <button
                    onClick={() => navigateToInfo(link.page)}
                    className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="size-3 text-zinc-600 group-hover:text-emerald-400 transition-colors" />
                    {link.label}
=======
                  <button onClick={() => navigateToInfo(link.page)} className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                    <ArrowRight className="size-3" /> {link.label}
>>>>>>> 727986fe0e8dccab0979cf37066d6e3ac22d8297
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}