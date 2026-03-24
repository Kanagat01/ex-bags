"use client"

import Link from "next/link"

const benefits = [
  {
    title: "Подлинность",
    text: "Специалисты (ex)bags проводят тщательную аутентификацию каждого лота. При покупке аксессуара вы получаете карту с электронным сертификатом, подтверждающим подлинность изделия.",
  },
  {
    title: "Экономия времени и удобный сервис",
    text: "Заботимся о вашем комфорте — примем лот для продажи в бутике или направим курьера. Возьмём предпродажную подготовку и взаимодействие с покупателем на себя. Менеджеры клиентского сервиса ответят на любые вопросы ежедневно с 10:00 до 22:00.",
  },
  {
    title: "Бережное хранение и безопасность",
    text: "Аккуратно относимся к аксессуарам на всех этапах — от подготовки до доставки. Заключаем договор и гарантируем безопасность сотрудничества и банковских операций.",
  },
  {
    title: "Гарантия и состояние",
    text: "Все изделия проходят предпродажную подготовку в spa (ex)bags. Принимаем аксессуары в хорошем и отличном состоянии. При желании вы сможете передать сумку сразу после покупки специалистам в spa.",
  },
  {
    title: "Селекционный подход и экспертная оценка",
    text: "Работаем с определённым брend-листом и помогаем установить конкурентную стоимость аксессуара, ориентируясь на индекс оценки предметов роскоши для повторной продажи.",
  },
]

const formats = [
  {
    title: "Выкуп",
    text: "Мы согласуем условия продажи, проверим аксессуар на подлинность и выкупим в течении 48 часов по предложенной нами стоимости.",
    href: "/application?format=purchase",
  },
  {
    title: "Реализация",
    text: "Мы согласуем с вами стоимость изделия, проведём предпродажную подготовку и опубликуем товар на сайте (ex)bags. После того, как ваш лот будет продан, вы получите оплату на счёт.",
    note: "*при продаже аксессуара, ранее купленного в (ex)bags, действует специальная комиссия −6% от стандартной.",
    href: "/application?format=commission",
  },
  {
    title: "Обмен",
    text: "Мы оценим ваше изделие и предложим стоимость, которая будет являться депозитом для покупки аксессуара из ассортимента (ex)bags.",
    link: "Подробнее",
    href: "/application?format=trade_in",
  },
  {
    title: "Консьерж сервис",
    text: "Услуга для продажи от 5 товаров. Личный менеджер (ex)bags приедет в удобное время и по удобному вам адресу для оценки аксессуаров, оформления документов и доставки.",
    link: "Подробнее",
    href: "/application",
  },
]

const steps = [
  {
    title: "Подайте заявку",
    text: "Оставьте заявку удобным вам способом: на сайте (ex)bags, в telegram bot, через менеджера клиентского сервиса.",
  },
  {
    title: "Передайте изделие в (ex)bags",
    text: "Мы пришлём курьера или примем аксессуар в бутике по адресу: Москва, Малый Казённый 12.",
  },
  {
    title: "Отслеживайте статус",
    text: "Отслеживайте статус продажи в личном кабинете на сайте (ex)bags. Менеджеры клиентского сервиса добавят описание и доставят изделие покупателю.",
  },
  {
    title: "Получите выплату",
    text: "Мы оповестим о продаже изделия и переведём деньги на вашу карту.",
  },
]


export default function HomePage() {
  return (
    <div className="flex flex-col">

      {/* Hero */}
      <section className="relative min-h-130 flex items-center overflow-hidden bg-[#f0ece4]">
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl font-light leading-tight tracking-tight text-neutral-900">
              Подарите аксессуарам<br />новую жизнь
            </h1>
            <p className="text-neutral-600 text-lg leading-relaxed max-w-sm">
              Мы поможем быстро и легко освободить гардероб и найти покупателей для ваших сумок.
            </p>
            <Link
              href="/application"
              className="inline-flex items-center justify-center border border-neutral-900 px-10 py-4 text-sm tracking-widest uppercase text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all duration-300 w-fit"
            >
              Начать продавать
            </Link>
          </div>
          <div className="relative h-90 md:h-120 hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80"
              alt="Luxury bags"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Форматы сотрудничества */}
      <section className="w-full max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-light tracking-tight text-center text-neutral-900 mb-12">
          Варианты сотрудничества
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {formats.map((f) => (
            <Link
              key={f.title}
              href={f.href}
              className="flex flex-col gap-3 border border-neutral-200 p-6 hover:border-neutral-400 transition-colors group"
            >
              <span className="font-medium text-neutral-900">{f.title}</span>
              <span className="text-sm text-neutral-500 leading-relaxed">{f.text}</span>
              {f.note && (
                <span className="text-xs text-neutral-400 leading-relaxed">{f.note}</span>
              )}
              {f.link && (
                <span className="text-sm underline text-neutral-500 group-hover:text-neutral-900 transition-colors mt-auto">
                  {f.link}
                </span>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* Преимущества */}
      <section className="w-full bg-neutral-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-light tracking-tight text-center text-neutral-900 mb-12">
            Преимущества сотрудничества
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-10">
            {benefits.map((b) => (
              <div key={b.title} className="flex flex-col gap-2">
                <span className="font-medium text-neutral-900 text-sm">{b.title}</span>
                <span className="text-sm text-neutral-500 leading-relaxed">{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Этапы */}
      <section className="w-full max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-light tracking-tight text-center text-neutral-900 mb-12">
          Этапы сотрудничества
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <div key={s.title} className="flex flex-col gap-3 bg-neutral-50 p-6">
              <span className="text-xs text-neutral-400 font-medium tracking-widest">
                0{i + 1}
              </span>
              <span className="font-medium text-neutral-900 text-sm">{s.title}</span>
              <span className="text-sm text-neutral-500 leading-relaxed">{s.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-neutral-900 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-light tracking-tight text-center text-white mb-10">
            Выберите удобный способ подачи заявки
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/application"
              className="inline-flex items-center justify-center border border-white px-8 py-3 text-sm tracking-widest uppercase text-white hover:bg-white hover:text-neutral-900 transition-all duration-300"
            >
              Оформить заявку на сайте
            </Link>
            <a
              href="https://t.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border border-white px-8 py-3 text-sm tracking-widest uppercase text-white hover:bg-white hover:text-neutral-900 transition-all duration-300"
            >
              Оформить заявку в Telegram-bot
            </a>
            <a
              href="tel:"
              className="inline-flex items-center justify-center border border-white px-8 py-3 text-sm tracking-widest uppercase text-white hover:bg-white hover:text-neutral-900 transition-all duration-300"
            >
              Через менеджера
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}