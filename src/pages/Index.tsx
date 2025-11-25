import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [scrollY, setScrollY] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    guests: '',
    attending: 'yes',
    message: ''
  });

  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    audio.loop = true;
    audio.volume = 0.4;
    setAudioElement(audio);
    
    const playAudio = () => {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        document.addEventListener('click', () => {
          audio.play();
          setIsPlaying(true);
        }, { once: true });
      });
    };
    
    playAudio();
    
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const toggleMusic = () => {
    if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const weddingDate = new Date('2025-06-15T15:00:00').getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      sectionRefs.current.forEach((section) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
          
          if (isVisible) {
            section.classList.add('visible');
          }
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Спасибо за ответ!",
      description: "Мы получили ваше подтверждение присутствия.",
    });
    setFormData({ name: '', guests: '', attending: 'yes', message: '' });
  };

  const timeline = [
    { time: '15:00', title: 'Сбор гостей', icon: 'Users' },
    { time: '15:30', title: 'Церемония', icon: 'Heart' },
    { time: '16:30', title: 'Фотосессия', icon: 'Camera' },
    { time: '17:00', title: 'Банкет', icon: 'Utensils' },
    { time: '19:00', title: 'Первый танец', icon: 'Music' },
    { time: '20:00', title: 'Развлечения', icon: 'Sparkles' },
  ];

  const photos = [
    'https://cdn.poehali.dev/projects/4d3e5455-415e-4ec0-b0fa-ec226c6f9dea/files/d164828d-7150-4e34-bcd1-b1aa7644cfc9.jpg',
    'https://cdn.poehali.dev/projects/4d3e5455-415e-4ec0-b0fa-ec226c6f9dea/files/d78b1bb0-f32c-4878-ba6a-84d2cd97b4f5.jpg',
    'https://cdn.poehali.dev/projects/4d3e5455-415e-4ec0-b0fa-ec226c6f9dea/files/84e10200-f485-499a-bb2f-31e018103b9d.jpg',
  ];

  return (
    <div className="min-h-screen bg-white">
      
      <Button
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 rounded-full w-14 h-14 p-0 shadow-2xl hover:scale-110 transition-transform bg-black border-2 border-gold hover:bg-black"
        variant="default"
      >
        {isPlaying ? (
          <Icon name="Volume2" size={24} className="animate-pulse text-gold" />
        ) : (
          <Icon name="VolumeX" size={24} className="text-gold" />
        )}
      </Button>
      
      <section 
        className="relative h-screen flex items-center justify-center overflow-hidden luxury-gradient"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          style={{
            transform: `scale(${1 + scrollY * 0.0005})`,
          }}
        >
          <source src="https://cdn.coverr.co/videos/coverr-romantic-couple-walking-on-the-beach-at-sunset-6164/1080p.mp4" type="video/mp4" />
        </video>
        
        <div className="golden-particles" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90" />
        <div className="absolute inset-0 gold-shimmer" />
        
        <div className="relative z-10 text-center px-4">
          <div className="mb-8 animate-text-slide stagger-1">
            <Icon name="Sparkles" size={60} className="mx-auto text-gold" />
          </div>
          <h1 className="text-6xl md:text-9xl font-light mb-6 text-gold animate-text-slide stagger-2" style={{ textShadow: '0 0 30px rgba(255, 215, 0, 0.5)' }}>
            Вячеслав & Сабрина
          </h1>
          <p className="text-3xl md:text-4xl font-light tracking-widest text-white/90 animate-text-slide stagger-3">
            15 июня 2025
          </p>
          <div className="mt-12 animate-text-slide stagger-4">
            <p className="text-xl md:text-2xl italic text-white/80">
              Приглашаем вас разделить с нами этот особенный день
            </p>
          </div>

          <div className="mt-16 animate-text-slide stagger-5">
            <p className="text-sm uppercase tracking-wider text-gold mb-8">До торжества осталось</p>
            <div className="grid grid-cols-4 gap-4 md:gap-8 max-w-2xl mx-auto">
              <Card className="p-4 md:p-6 bg-black/60 backdrop-blur-sm border-gold/30">
                <div className="text-4xl md:text-5xl font-light text-gold">{timeLeft.days}</div>
                <div className="text-xs md:text-sm text-white/70 mt-2">дней</div>
              </Card>
              <Card className="p-4 md:p-6 bg-black/60 backdrop-blur-sm border-gold/30">
                <div className="text-4xl md:text-5xl font-light text-gold">{timeLeft.hours}</div>
                <div className="text-xs md:text-sm text-white/70 mt-2">часов</div>
              </Card>
              <Card className="p-4 md:p-6 bg-black/60 backdrop-blur-sm border-gold/30">
                <div className="text-4xl md:text-5xl font-light text-gold">{timeLeft.minutes}</div>
                <div className="text-xs md:text-sm text-white/70 mt-2">минут</div>
              </Card>
              <Card className="p-4 md:p-6 bg-black/60 backdrop-blur-sm border-gold/30">
                <div className="text-4xl md:text-5xl font-light text-gold">{timeLeft.seconds}</div>
                <div className="text-xs md:text-sm text-white/70 mt-2">секунд</div>
              </Card>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={32} className="text-gold" />
        </div>
      </section>

      <section 
        ref={(el) => (sectionRefs.current[0] = el)}
        className="py-24 px-4 relative bg-white scroll-fade-in"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-light text-center mb-16 text-gold" style={{ textShadow: '0 0 20px rgba(255, 215, 0, 0.3)' }}>
            Наша История
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {photos.map((photo, index) => (
              <Card 
                key={index}
                className="overflow-hidden group cursor-pointer transition-all duration-500 hover:shadow-2xl border-2 border-black/10 hover:border-gold/50"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img 
                    src={photo} 
                    alt={`Фото ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section 
        ref={(el) => (sectionRefs.current[1] = el)}
        className="py-24 px-4 bg-gradient-to-b from-white via-gray-50 to-white scroll-fade-in"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-light text-center mb-4 text-gold" style={{ textShadow: '0 0 20px rgba(255, 215, 0, 0.3)' }}>
            Программа Дня
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">
            15 июня 2025 года
          </p>

          <div className="space-y-6">
            {timeline.map((item, index) => (
              <Card
                key={index}
                className="p-6 md:p-8 bg-white border-2 border-black/10 hover:border-gold/50 transition-all duration-300 hover:shadow-xl group"
              >
                <div className="flex items-center gap-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-black flex items-center justify-center group-hover:bg-gold transition-colors duration-300">
                    <Icon name={item.icon as any} size={28} className="text-gold group-hover:text-black transition-colors duration-300" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <h3 className="text-2xl font-light text-black">{item.title}</h3>
                      <span className="text-xl font-light text-gold">{item.time}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section 
        ref={(el) => (sectionRefs.current[2] = el)}
        className="py-24 px-4 luxury-gradient scroll-fade-in relative overflow-hidden"
      >
        <div className="golden-particles" />
        <div className="max-w-3xl mx-auto relative z-10">
          <Card className="p-8 md:p-12 bg-black/60 backdrop-blur-sm border-gold/30 shadow-2xl">
            <div className="text-center mb-8">
              <Icon name="MapPin" size={48} className="mx-auto mb-4 text-gold" />
              <h2 className="text-4xl md:text-5xl font-light mb-4 text-gold" style={{ textShadow: '0 0 20px rgba(255, 215, 0, 0.4)' }}>Место Проведения</h2>
            </div>

            <div className="space-y-6 text-white/90">
              <div className="text-center">
                <h3 className="text-2xl font-light mb-2 text-gold">Банкетный зал "Элегант"</h3>
                <p className="text-lg mb-4 text-white/70">ул. Цветочная, д. 25, Москва</p>
                <Button 
                  className="bg-gold hover:bg-gold/80 text-black font-medium"
                  onClick={() => window.open('https://maps.google.com', '_blank')}
                >
                  <Icon name="Navigation" size={20} className="mr-2" />
                  Построить маршрут
                </Button>
              </div>

              <div className="border-t border-gold/20 pt-6 mt-6">
                <p className="text-center text-white/60">
                  Парковка для гостей доступна на территории
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section 
        ref={(el) => (sectionRefs.current[3] = el)}
        className="py-24 px-4 bg-white scroll-fade-in"
      >
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 md:p-12 border-2 border-black/10 shadow-2xl">
            <div className="text-center mb-8">
              <Icon name="Mail" size={48} className="mx-auto mb-4 text-gold" />
              <h2 className="text-4xl md:text-5xl font-light mb-4 text-gold" style={{ textShadow: '0 0 20px rgba(255, 215, 0, 0.3)' }}>
                Подтверждение Присутствия
              </h2>
              <p className="text-gray-600">
                Пожалуйста, сообщите нам о вашем присутствии до 1 июня
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-black">Ваше имя</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="border-black/20 focus:border-gold"
                />
              </div>

              <div>
                <Label htmlFor="guests" className="text-black">Количество гостей</Label>
                <Input
                  id="guests"
                  type="number"
                  min="1"
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  required
                  className="border-black/20 focus:border-gold"
                />
              </div>

              <div>
                <Label className="text-black">Вы придёте?</Label>
                <div className="flex gap-4 mt-2">
                  <Button
                    type="button"
                    variant={formData.attending === 'yes' ? 'default' : 'outline'}
                    onClick={() => setFormData({ ...formData, attending: 'yes' })}
                    className={formData.attending === 'yes' ? 'bg-gold hover:bg-gold/80 text-black' : 'border-black/20 text-black hover:bg-gold/10'}
                  >
                    Да, с удовольствием
                  </Button>
                  <Button
                    type="button"
                    variant={formData.attending === 'no' ? 'default' : 'outline'}
                    onClick={() => setFormData({ ...formData, attending: 'no' })}
                    className={formData.attending === 'no' ? 'bg-gold hover:bg-gold/80 text-black' : 'border-black/20 text-black hover:bg-gold/10'}
                  >
                    К сожалению, нет
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="message" className="text-black">Пожелания (необязательно)</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="border-black/20 focus:border-gold"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gold hover:bg-gold/80 text-black font-medium text-lg py-6"
              >
                Отправить ответ
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <footer className="bg-gradient-to-br from-black via-gray-900 to-black py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Icon name="Heart" size={40} className="mx-auto mb-4 text-gold" />
          <p className="text-xl font-light mb-2 text-gold">
            Вячеслав & Сабрина
          </p>
          <p className="text-white/60">
            С любовью ждём вас на нашем торжестве
          </p>
          <div className="mt-8 pt-8 border-t border-gold/20">
            <p className="text-sm text-white/40">
              15 июня 2025 • Москва
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;