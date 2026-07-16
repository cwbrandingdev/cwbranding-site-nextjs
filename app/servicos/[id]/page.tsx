import { translations } from "@/app/utils/translations";
import Link from "next/link";
import {
  ChevronLeft,
  Calendar,
  Briefcase,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

interface ProjectProps {
  params: Promise<{ id: string }>;
}

export default async function ServicesPage({ params }: ProjectProps) {
  const { id } = await params;

  const servicesList = translations.PT.servicesList;

  const servico = servicesList.find((p) => String(p.id) === String(id));

  if (!servico) {
    return (
      <div className="h-screen bg-[#004D4C] flex flex-col items-center space-y-6 justify-center text-white px-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-center">
          Serviço não encontrado
        </h1>
        <Link
          href="/"
          className="group flex items-center gap-2 border border-[#E8C39E]/30 px-6 py-3 rounded-full text-white hover:bg-[#E8C39E] hover:text-[#004D4C] transition-all duration-300 font-medium"
        >
          <ChevronLeft size={20} />
          Voltar ao Início
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#004D4C] text-white overflow-hidden selection:bg-[#E8C39E] selection:text-[#004D4C]">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e8c39e08_1px,transparent_1px),linear-gradient(to_bottom,#e8c39e08_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E8C39E]/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 md:py-32">
        <Link
          href="/"
          className="group flex items-center gap-2 text-white/70 hover:text-[#E8C39E] transition-colors mb-12 md:mb-16 w-fit font-mono text-xs uppercase tracking-widest"
        >
          <ChevronLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Voltar para serviços
        </Link>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-start">
          <div className="space-y-10">
            <header className="space-y-4">
              <div className="flex items-center gap-3 text-[#E8C39E] font-mono text-sm tracking-widest uppercase">
                <Briefcase size={16} />
                <span>Nossos Serviços</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-bold tracking-tighter leading-tight">
                {servico.title}
                <span className="text-[#E8C39E]">.</span>
              </h1>
            </header>

            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl">
              <img
                src="https://picsum.photos/1200/675"
                alt={servico.title}
                className="w-full h-full object-cover opacity-85 hover:opacity-100 transition-opacity duration-500"
              />
            </div>

            <div className="space-y-6 text-white/90 leading-relaxed font-light text-base md:text-lg">
              <p className="font-semibold text-xl text-[#E8C39E]">
                {servico.desc}{" "}
              </p>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                ac ante eget diam molestie sodales. Sed convallis lectus vitae
                sem finibus, non condimentum nisl convallis. Proin cursus purus
                et lorem maximus hendrerit.
              </p>

              <p>
                Duis convallis elementum neque ut commodo. Maecenas tristique
                sem sit amet magna congue elementum. Mauris condimentum lectus
                ut tellus posuere porttitor. Morbi sit amet purus eget mi
                pellentesque egestas.
              </p>

              <div className="pt-4 space-y-3">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Sparkles size={18} className="text-[#E8C39E]" /> Benefícios e
                  Diferenciais
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-white/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle2
                      size={16}
                      className="text-[#E8C39E] shrink-0"
                    />{" "}
                    Atendimento Personalizado
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2
                      size={16}
                      className="text-[#E8C39E] shrink-0"
                    />{" "}
                    Profissionais Especializados
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2
                      size={16}
                      className="text-[#E8C39E] shrink-0"
                    />{" "}
                    Tecnologia de Ponta
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2
                      size={16}
                      className="text-[#E8C39E] shrink-0"
                    />{" "}
                    Suporte Dedicado 24/7
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <aside className="sticky top-32 space-y-8">
            <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl space-y-8">
              <div className="space-y-2">
                <p className="text-[#E8C39E]/80 font-mono text-xs uppercase tracking-widest">
                  Disponibilidade
                </p>
                <div className="flex items-center gap-3 text-white/90">
                  <Calendar size={18} className="text-[#E8C39E]" />
                  <span className="text-sm font-medium">
                    Imediata / Sob Agendamento
                  </span>
                </div>
              </div>

              <div className="h-[1px] w-full bg-white/10" />

              <button className="w-full bg-[#E8C39E] text-[#004D4C] hover:bg-white transition-all duration-300 font-semibold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-lg">
                Solicitar Orçamento
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

// Alinhamos para mapear de forma correta e gerar as páginas estáticas com os IDs reais do translations.PT
export async function generateStaticParams() {
  const servicesList = translations.PT.servicesList;
  return servicesList.map((p) => ({
    id: String(p.id),
  }));
}
