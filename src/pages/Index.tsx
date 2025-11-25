import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    setAudioElement(audio);
    
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
    };
    window.addEventListener('scroll', handleScroll);
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
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-muted/30">
      
      <Button
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 rounded-full w-14 h-14 p-0 shadow-2xl hover:scale-110 transition-transform"
        variant={isPlaying ? "default" : "outline"}
      >
        {isPlaying ? (
          <Icon name="Volume2" size={24} className="animate-pulse" />
        ) : (
          <Icon name="VolumeX" size={24} />
        )}
      </Button>
      
      <section 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url(${photos[2]})`,
            transform: `scale(${1 + scrollY * 0.0005})`,
          }}
        />
        
        <div className="relative z-10 text-center px-4 fade-in-up">
          <div className="mb-8">
            <Icon name="Heart" size={60} className="mx-auto text-primary animate-pulse" />
          </div>
          <h1 className="md:text-9xl font-light mb-4 text-center text-9xl text-[#000000]">Вячеслав
 & 
Сабрина</h1>
          <p className="text-2xl md:text-3xl font-light tracking-widest text-muted-foreground">
            15 июня 2025
          </p>
          <div className="mt-12 fade-in-up-delay">
            <p className="text-lg italic text-foreground/80">
              Приглашаем вас разделить с нами этот особенный день
            </p>
          </div>

          <div className="mt-16 fade-in-up-delay">
            <p className="text-sm uppercase tracking-wider text-muted-foreground mb-6">До торжества осталось</p>
            <div className="grid grid-cols-4 gap-4 md:gap-8 max-w-2xl mx-auto">
              <Card className="p-4 md:p-6 bg-card/80 backdrop-blur-sm">
                <div className="text-4xl md:text-5xl font-light text-primary">{timeLeft.days}</div>
                <div className="text-xs md:text-sm text-muted-foreground mt-2">дней</div>
              </Card>
              <Card className="p-4 md:p-6 bg-card/80 backdrop-blur-sm">
                <div className="text-4xl md:text-5xl font-light text-primary">{timeLeft.hours}</div>
                <div className="text-xs md:text-sm text-muted-foreground mt-2">часов</div>
              </Card>
              <Card className="p-4 md:p-6 bg-card/80 backdrop-blur-sm">
                <div className="text-4xl md:text-5xl font-light text-primary">{timeLeft.minutes}</div>
                <div className="text-xs md:text-sm text-muted-foreground mt-2">минут</div>
              </Card>
              <Card className="p-4 md:p-6 bg-card/80 backdrop-blur-sm">
                <div className="text-4xl md:text-5xl font-light text-primary">{timeLeft.seconds}</div>
                <div className="text-xs md:text-sm text-muted-foreground mt-2">секунд</div>
              </Card>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={32} className="text-primary" />
        </div>
      </section>

      <section className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-light text-center mb-16 text-primary">
            Наша История
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {photos.map((photo, index) => (
              <Card 
                key={index}
                className="overflow-hidden group cursor-pointer transition-all duration-500 hover:shadow-2xl"
                style={{
                  transform: `translateY(${Math.max(0, scrollY - 400) * (index % 2 === 0 ? -0.1 : 0.1)}px)`,
                }}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img 
                    src={photo} 
                    alt={`Фото ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-secondary/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-light text-center mb-4 text-primary">
            Программа Дня
          </h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">
            15 июня 2025 года
          </p>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary/30" />
            
            {timeline.map((item, index) => (
              <div 
                key={index}
                className={`relative mb-12 ${index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto md:text-left'}`}
                style={{
                  opacity: Math.min(1, Math.max(0, 1 - (scrollY - 800 - index * 100) / 200)),
                  transform: `translateX(${Math.max(-50, Math.min(0, (scrollY - 800 - index * 100) / 4))}px)`,
                }}
              >
                <Card className="inline-block p-6 bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Icon name={item.icon as any} size={24} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-light text-primary">{item.time}</p>
                      <h3 className="text-xl font-medium">{item.title}</h3>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-light text-center mb-16 text-primary">
            Место Проведения
          </h2>

          <Card className="overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative aspect-square md:aspect-auto">
                <img 
                  src={photos[2]} 
                  alt="Место проведения"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-8 md:p-12 flex flex-col justify-center bg-card/50 backdrop-blur-sm">
                <h3 className="text-3xl font-light mb-6 text-primary">
                  Усадьба "Романтика"
                </h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <Icon name="MapPin" size={24} className="text-primary mt-1" />
                    <div>
                      <p className="font-medium">Адрес</p>
                      <p className="text-muted-foreground">
                        Московская область, д. Васильево, ул. Парковая, 15
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Icon name="Clock" size={24} className="text-primary mt-1" />
                    <div>
                      <p className="font-medium">Время</p>
                      <p className="text-muted-foreground">15:00 - 23:00</p>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full gap-2 text-lg py-6"
                  onClick={() => window.open('https://yandex.ru/maps', '_blank')}
                >
                  <Icon name="Navigation" size={20} />
                  Открыть на карте
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="py-24 px-4 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-light text-center mb-4 text-primary">
            Подтверждение
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Будем рады видеть вас на нашем празднике
          </p>

          <Card className="p-8 md:p-12 shadow-2xl bg-card/80 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-lg">Ваше имя *</Label>
                <Input 
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  className="mt-2 text-lg py-6"
                  placeholder="Иван Иванов"
                />
              </div>

              <div>
                <Label htmlFor="guests" className="text-lg">Количество гостей *</Label>
                <Input 
                  id="guests"
                  type="number"
                  min="1"
                  value={formData.guests}
                  onChange={(e) => setFormData({...formData, guests: e.target.value})}
                  required
                  className="mt-2 text-lg py-6"
                  placeholder="2"
                />
              </div>

              <div>
                <Label className="text-lg mb-4 block">Вы будете присутствовать? *</Label>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant={formData.attending === 'yes' ? 'default' : 'outline'}
                    onClick={() => setFormData({...formData, attending: 'yes'})}
                    className="flex-1 py-6 text-lg"
                  >
                    <Icon name="Check" size={20} className="mr-2" />
                    Да, буду
                  </Button>
                  <Button
                    type="button"
                    variant={formData.attending === 'no' ? 'default' : 'outline'}
                    onClick={() => setFormData({...formData, attending: 'no'})}
                    className="flex-1 py-6 text-lg"
                  >
                    <Icon name="X" size={20} className="mr-2" />
                    Не смогу
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="message" className="text-lg">Пожелания и комментарии</Label>
                <Textarea 
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="mt-2 text-lg min-h-32"
                  placeholder="Напишите ваши пожелания..."
                />
              </div>

              <Button type="submit" className="w-full text-lg py-6 gap-2">
                <Icon name="Send" size={20} />
                Отправить подтверждение
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <section className="py-20 px-4 bg-secondary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-light mb-12 text-primary">
            Контакты
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 hover:shadow-xl transition-shadow">
              <div className="mb-4">
                <Icon name="User" size={32} className="mx-auto text-primary" />
              </div>
              <h3 className="text-2xl font-light mb-2">Анна</h3>
              <a href="tel:+79991234567" className="text-lg text-muted-foreground hover:text-primary transition-colors">
                +7 (999) 123-45-67
              </a>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-shadow">
              <div className="mb-4">
                <Icon name="User" size={32} className="mx-auto text-primary" />
              </div>
              <h3 className="text-2xl font-light mb-2">Дмитрий</h3>
              <a href="tel:+79991234568" className="text-lg text-muted-foreground hover:text-primary transition-colors">
                +7 (999) 123-45-68
              </a>
            </Card>
          </div>

          <div className="mt-16">
            <Icon name="Heart" size={48} className="mx-auto text-primary animate-pulse" />
            <p className="text-2xl font-light mt-6 text-foreground/80 italic">
              С любовью, Анна и Дмитрий
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;