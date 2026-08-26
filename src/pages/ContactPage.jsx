import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Send, CheckCircle2, ChevronDown, ChevronUp, Clock, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import EditableSection from '../components/cms/EditableSection';

export default function ContactPage() {
  const { showToast, siteContent } = useShop();
  const c = siteContent?.contact_info || {};

  const phone = c.phone || '+91 95442 36858';
  const whatsappUrl = c.whatsapp_url || 'https://wa.me/919544236858';
  const email = c.email || 'atelier@nooraldhuha.com';
  const address = c.address || 'NOOR AL DHUHA Atelier, Dubai, UAE';
  const hours = c.hours || 'Mon – Sat, 9:00 AM – 8:00 PM GST';
  const faqs = Array.isArray(c.faqs) && c.faqs.length > 0 ? c.faqs : [
    { q: 'What is Grade 6A Mulberry Silk and why is it superior?', a: 'Grade 6A represents the pinnacle of raw silk quality...' },
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Bespoke Order / Custom Sizing',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);


  const handleSubmit = (e) => {

    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill in your name, email, and message.', 'error');
      return;
    }
    setSubmitted(true);
    showToast('Inquiry sent to NOOR AL DHUHA Atelier Concierge.');
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'Bespoke Order / Custom Sizing',
        message: ''
      });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-neutral-white pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 animate-fade-in">
      <EditableSection cmsKey="contact_info" label="Contact & FAQs">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-xs font-sans font-bold uppercase tracking-widest text-primary">
          <Sparkles className="w-3.5 h-3.5 text-royal-violet" />
          <span>Atelier Client Care</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary font-medium tracking-tight">
          Connect With Our Atelier
        </h1>
        <p className="text-xs sm:text-sm text-primary/70 font-sans max-w-md mx-auto leading-relaxed">
          Whether you need bespoke styling guidance, custom sizing assistance, or corporate gifting inquiries, our concierge is at your service.
        </p>
      </div>

      {/* Grid: Direct Contact Channels & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Direct Contact Info & WhatsApp */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white rounded-2xl border border-primary/15 p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="font-serif text-2xl font-medium text-primary">
              Direct Inquiries
            </h2>

            <div className="space-y-5 text-xs sm:text-sm font-sans text-primary">
              
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-full bg-surface-container text-royal-violet shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold block text-primary">Concierge Hotline & WhatsApp</span>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-royal-violet hover:underline block mt-0.5 font-medium">
                    {phone}
                  </a>
                  <span className="text-[11px] text-primary/60">{hours}</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-full bg-surface-container text-royal-violet shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold block text-primary">Editorial & Client Services</span>
                  <a href={`mailto:${email}`} className="text-royal-violet hover:underline block mt-0.5 font-medium">
                    {email}
                  </a>
                  <span className="text-[11px] text-primary/60">Guaranteed response within 4 business hours</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-full bg-surface-container text-royal-violet shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold block text-primary">Flagship Atelier & Design Studio</span>
                  <p className="text-primary/70 mt-0.5 leading-relaxed">
                    {address}
                  </p>
                </div>
              </div>

            </div>

            {/* Quick Action Channels */}
            <div className="pt-4 border-t border-primary/10 flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-sans font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
              <a
                href="https://www.instagram.com/nailberrie._/"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 border border-primary/20 bg-surface-container hover:bg-surface-container-highest text-primary rounded-lg text-xs font-sans font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram</span>
              </a>
            </div>

          </div>

          {/* Response SLA badge */}
          <div className="bg-[#f4ede3] rounded-2xl border border-primary/10 p-5 flex items-center gap-4 text-xs font-sans text-primary">
            <Clock className="w-5 h-5 text-royal-violet shrink-0" />
            <div>
              <span className="font-bold block">Priority VIP Inquiries</span>
              <p className="text-primary/70 text-[11px]">Orders and styling queries receive prompt attention from our resident modest couturiers.</p>
            </div>
          </div>

        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl border border-primary/15 p-6 sm:p-10 shadow-md">
            
            <h2 className="font-serif text-2xl font-medium text-primary mb-2">
              Send a Message
            </h2>
            <p className="text-xs text-primary/70 font-sans mb-6 leading-relaxed">
              Fill out the form below and our styling team will be in touch shortly.
            </p>

            {submitted ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-8 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
                <h3 className="font-serif text-xl font-medium text-emerald-900">
                  Thank You, Message Received
                </h3>
                <p className="text-xs text-emerald-800/80 font-sans max-w-sm mx-auto">
                  Our atelier concierge has received your note and will get back to you promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-primary/70 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Al-Mansoor"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-surface-container/50 border border-primary/20 rounded-lg py-3 px-4 text-sm font-sans text-primary placeholder:text-primary/30 focus:outline-none focus:border-royal-violet focus:ring-1 focus:ring-royal-violet transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-primary/70 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sarah@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-surface-container/50 border border-primary/20 rounded-lg py-3 px-4 text-sm font-sans text-primary placeholder:text-primary/30 focus:outline-none focus:border-royal-violet focus:ring-1 focus:ring-royal-violet transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-primary/70 mb-1.5">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +971 50 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-surface-container/50 border border-primary/20 rounded-lg py-3 px-4 text-sm font-sans text-primary placeholder:text-primary/30 focus:outline-none focus:border-royal-violet focus:ring-1 focus:ring-royal-violet transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-primary/70 mb-1.5">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-surface-container/50 border border-primary/20 rounded-lg py-3 px-4 text-sm font-sans text-primary focus:outline-none focus:border-royal-violet focus:ring-1 focus:ring-royal-violet transition-all cursor-pointer"
                    >
                      <option value="Bespoke Order / Custom Sizing">Bespoke Order / Custom Sizing</option>
                      <option value="Order Tracking & Logistics">Order Tracking & Logistics</option>
                      <option value="Fabric & Care Questions">Fabric & Care Questions</option>
                      <option value="Bridal & Event Capsule">Bridal & Event Capsule</option>
                      <option value="Press & Collaboration">Press & Collaboration</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-primary/70 mb-1.5">
                    Your Message / Styling Request *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us how we can assist you with your modest couture wardrobe..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-surface-container/50 border border-primary/20 rounded-lg py-3 px-4 text-sm font-sans text-primary placeholder:text-primary/30 focus:outline-none focus:border-royal-violet focus:ring-1 focus:ring-royal-violet transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-primary hover:bg-royal-violet text-white font-sans text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Concierge</span>
                </button>
              </form>
            )}

          </div>
        </div>

      </div>

      {/* Frequently Asked Questions (FAQ) Accordion */}
      <div className="space-y-6 pt-6">
        <div className="text-center space-y-2">
          <h2 className="font-serif text-2xl sm:text-3xl text-primary font-medium">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-primary/60 font-sans">
            Quick answers regarding our fabrics, sizing, and international fulfillment
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-primary/15 bg-white overflow-hidden shadow-xs transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 cursor-pointer hover:bg-surface-container/50 transition-colors"
              >
                <span className="font-serif text-base font-medium text-primary">
                  {faq.q}
                </span>
                {openFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-royal-violet shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-primary/40 shrink-0" />
                )}
              </button>

              {openFaq === idx && (
                <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm font-sans text-primary/75 leading-relaxed border-t border-primary/5 bg-surface-container/20">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      </EditableSection>

    </div>
  );
}
