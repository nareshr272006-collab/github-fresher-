import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HouseVisualizer3D } from './components/HouseVisualizer3D';
import { Portfolio } from './components/Portfolio';
import { CostEstimator } from './components/CostEstimator';
import { CraftsmanshipStandards } from './components/CraftsmanshipStandards';
import { BeforeAfterShowcase } from './components/BeforeAfterShowcase';
import { TestimonialsAwards } from './components/TestimonialsAwards';
import { ConsultationForm } from './components/ConsultationForm';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState<boolean>(false);
  const [consultationNotes, setConsultationNotes] = useState<string>('');

  const openConsultationWithNote = (notes: string = '') => {
    setConsultationNotes(notes);
    setIsConsultationModalOpen(true);
  };

  const handleTransferEstimate = (estimateSummary: string) => {
    // Also scroll down to the dedicated consultation section or open modal
    setConsultationNotes(`Client Scope Estimate: ${estimateSummary}`);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsConsultationModalOpen(true);
    }
  };

  return (
    <div className="drs-app">
      {/* Navigation */}
      <Navbar onOpenConsultation={() => openConsultationWithNote('')} />

      {/* Hero Section */}
      <Hero onOpenConsultation={() => openConsultationWithNote('')} />

      {/* Interactive 3D House Visualizer (Three.js) */}
      <HouseVisualizer3D />

      {/* Signature Residences Portfolio */}
      <Portfolio
        onSelectProjectForInquiry={(projectTitle) =>
          openConsultationWithNote(`Inquiry regarding bespoke residence inspired by: ${projectTitle}`)
        }
      />

      {/* Custom Home Scope & Cost Estimator */}
      <CostEstimator onTransferEstimateToForm={handleTransferEstimate} />

      {/* 5-Phase Turnkey Engineering Standards */}
      <CraftsmanshipStandards />

      {/* Interactive Draggable Before / After Transformation */}
      <BeforeAfterShowcase />

      {/* Client Testimonials & Institutional Honors */}
      <TestimonialsAwards />

      {/* Dedicated In-Page Consultation Section */}
      <section id="contact" className="section-padding" style={{ position: 'relative' }}>
        <div className="container">
          <div
            className="glass-card"
            style={{
              padding: 'clamp(2rem, 5vw, 4rem)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-gold-strong)',
              boxShadow: 'var(--gold-subtle-glow)'
            }}
          >
            <ConsultationForm initialNotes={consultationNotes} isModal={false} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Floating Modal for VIP Consultation */}
      {isConsultationModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(4, 6, 9, 0.88)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
          onClick={() => setIsConsultationModalOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: '720px' }}>
            <ConsultationForm
              initialNotes={consultationNotes}
              isModal={true}
              onClose={() => setIsConsultationModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
