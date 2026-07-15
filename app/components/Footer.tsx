export function Footer() {
  return (
    <footer className="bg-[var(--brand-ink)] text-[color:var(--sand-soft)]/70 py-16 px-6 md:px-12 text-sm">
      <div className="mx-auto max-w-[1400px] grid md:grid-cols-3 gap-10">
        <div>
          <p className="font-display text-2xl tracking-[0.3em] text-[color:var(--sand-soft)]">
            CWBRANDING<sup className="text-[10px]">®</sup>
          </p>
          <p className="mt-4 max-w-sm leading-relaxed">
            A sua agência de marketing. Curitiba — PR.
          </p>
        </div>
        <div>
          <p className="uppercase tracking-[0.2em] text-[color:var(--sand-soft)] mb-3">
            Navegação
          </p>
          <ul className="space-y-2">
            <li>
              <a
                href="#servicos"
                className="hover:text-[color:var(--sand-soft)]"
              >
                Serviços
              </a>
            </li>
            <li>
              <a href="#sobre" className="hover:text-[color:var(--sand-soft)]">
                Sobre Nós
              </a>
            </li>
            <li>
              <a
                href="http://wa.me/41996250984"
                className="hover:text-[color:var(--sand-soft)]"
              >
                Contato
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="uppercase tracking-[0.2em] text-[color:var(--sand-soft)] mb-3">
            Contato
          </p>
          <p>WhatsApp: (41) 99625-0984</p>
          <p className="mt-2">Curitiba — Paraná, Brasil</p>
        </div>
      </div>
      <p className="mt-14 text-xs opacity-60">
        © {new Date().getFullYear()} CWBranding. Todos os direitos reservados.
      </p>
    </footer>
  );
}
