import { useState } from 'react';

const testimonials = [
  {
    quote:
      'We felt lost in our previous auth provider’s application authentications, disparate environments, and our intricate tenant setup. Wristband’s advanced tenant-level features are a game changer, enabling us to spin up customized environments for each client with just a few clicks. Their team has been extremely responsive, helping to streamline our authentication, freeing up valuable time for our engineers.',
    name: 'Victor Sanchez',
    title: 'Senior Software Engineer at Thoughtly',
    image: '/images/testimonials/victor-sanchez.jpeg',
  },
  {
    quote:
      'Switching over from a competing auth provider to Wristband was a breeze! We were up and running in an afternoon with all the bells and whistles. And their support is outstanding whenever we have any questions. By trusting the folks at Wristband with the security of our app, we’re able to spend more time building the product we love and advancing our mission!',
    name: 'Kai Russo',
    title: 'Founding Engineer at CuroWork',
    image: '/images/testimonials/kai-russo.jpg',
  },
  {
    quote:
      'As an API automation platform for startups and enterprises alike, security is critical for us. We rely on Wristband to handle all machine authentication and authorization across our microservices, ensuring each service remains secure. Their low-code platform delivers enterprise-grade security effortlessly, and we’re looking forward to moving our user authentication to them, too.',
    name: 'Intesar Mohammed',
    title: 'Co-Founder & CEO at PerfAI',
    image: '/images/testimonials/intesar-mohammed.jpeg',
  },
  {
    quote:
      'We serve enterprise customers, so having reliable and scalable authentication is non-negotiable. Wristband’s multi-tenant auth was exactly what we needed. Their hands-on support guided us through a quick and smooth integration, and onboarding new customers is easy. We highly recommend Wristband to anyone looking for an authentication solution that just works.',
    name: 'Nithin Mummaneni',
    title: 'Founder and CEO at Infinity Loop',
    image: '/images/testimonials/nithin.webp',
  },
  {
    quote:
      'Wristband has been our ideal authentication partner to support our customers quickly. Their B2B multi-tenant auth system is secure, easy to integrate, and affordable. The flexibility and robust security have streamlined our operations, and their responsive support is amazing. We highly recommend Wristband for any business needing a dependable, cost-effective authentication solution.',
    name: 'Chris Lawson',
    title: 'Co-Founder and Engineering Lead at GreenSight',
    image: '/images/testimonials/chris-lawson.jpeg',
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const t = testimonials[index];

  const prev = () => setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  return (
    <div className="testimonials">
      <blockquote key={t.name}>
        <p>“{t.quote}”</p>
        <footer>
          <img src={t.image} alt={t.name} width={64} height={64} />
          <div>
            <strong>{t.name}</strong>
            <span>{t.title}</span>
          </div>
        </footer>
      </blockquote>
      <div className="t-nav">
        <button type="button" onClick={prev} aria-label="Previous testimonial">
          <img src="/images/icons/arrow-left.svg" alt="" width={20} height={20} />
        </button>
        <span>
          {index + 1} / {testimonials.length}
        </span>
        <button type="button" onClick={next} aria-label="Next testimonial">
          <img src="/images/icons/arrow-right.svg" alt="" width={20} height={20} />
        </button>
      </div>
      <style>{`
        .testimonials blockquote {
          margin: 0;
          background: #fff;
          border: 1px solid #e8e8ed;
          border-radius: 16px;
          padding: 40px;
          min-height: 280px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 28px;
        }
        .testimonials p {
          font-size: 1.15rem;
          line-height: 1.6;
          margin: 0;
          color: #222;
        }
        .testimonials footer {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .testimonials footer img {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          object-fit: cover;
        }
        .testimonials footer strong {
          display: block;
          font-size: 1rem;
        }
        .testimonials footer span {
          display: block;
          font-size: 0.9rem;
          color: #666;
        }
        .t-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-top: 24px;
        }
        .t-nav button {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid #e8e8ed;
          background: #fff;
          display: grid;
          place-items: center;
        }
        .t-nav button:hover {
          border-color: #3635c0;
        }
        .t-nav span {
          font-size: 0.9rem;
          color: #666;
        }
      `}</style>
    </div>
  );
}
