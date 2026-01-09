import React from 'react';
import { Star } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: "Aïcha D.",
      location: "Paris → Dakar",
      text: "J'ai trouvé un appartement pour ma mère à Dakar depuis Paris. Tout s'est fait en ligne, c'était très simple !",
      rating: 5
    },
    {
      name: "Mamadou S.",
      location: "Propriétaire, Thiès",
      text: "Grâce à Deukeulma, j'ai loué ma maison en moins de 2 semaines. La plateforme est vraiment efficace.",
      rating: 5
    },
    {
      name: "Sophie M.",
      location: "Expatriée, Dakar",
      text: "En tant qu'expatriée, j'avais besoin d'un logement rapidement. Deukeulma m'a facilité toutes les démarches.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-dark-800/30">
      <div className="section-container">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-16">
          Ils nous font confiance
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="card-dark">
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-secondary-500 text-secondary-500" />
                ))}
              </div>
              <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
              <div className="border-t border-dark-700 pt-4">
                <p className="font-semibold text-primary-300">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}