import { useMemo, useState, type ReactNode } from "react";

type Page =
  | "dashboard"
  | "library"
  | "subject"
  | "add-material"
  | "alerts"
  | "new-alert"
  | "alert-detail"
  | "circles"
  | "circle-detail"
  | "profile"
  | "empty";

type IconName =
  | "home"
  | "book"
  | "bell"
  | "users"
  | "user"
  | "plus"
  | "search"
  | "calendar"
  | "arrow"
  | "file"
  | "lock"
  | "upload"
  | "clock"
  | "more"
  | "download"
  | "eye"
  | "edit"
  | "trash"
  | "shield"
  | "check"
  | "chevron"
  | "logout"
  | "settings"
  | "image"
  | "layers"
  | "menu"
  | "close";

const iconPaths: Record<IconName, ReactNode> = {
  home: (
    <>
      <path d="m3 11 9-8 9 8" />
      <path d="M5 10v10h14V10M9 20v-6h6v6" />
    </>
  ),
  book: (
    <>
      <path d="M4 5a3 3 0 0 1 3-3h12v17H7a3 3 0 0 0-3 3z" />
      <path d="M4 5v17M8 7h7" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </>
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 22a8 8 0 0 1 16 0" />
    </>
  ),
  plus: (
    <>
      <path d="M12 5v14M5 12h14" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </>
  ),
  arrow: (
    <>
      <path d="m9 18 6-6-6-6" />
    </>
  ),
  file: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M8 13h8M8 17h5" />
    </>
  ),
  lock: (
    <>
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </>
  ),
  upload: (
    <>
      <path d="M12 16V4M7 9l5-5 5 5" />
      <path d="M20 15v5H4v-5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  more: (
    <>
      <circle cx="5" cy="12" r="1" />
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v12M7 10l5 5 5-5" />
      <path d="M5 21h14" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  edit: (
    <>
      <path d="m14 4 6 6L8 22H2v-6z" />
      <path d="m12 6 6 6" />
    </>
  ),
  trash: (
    <>
      <path d="M3 6h18M8 6V3h8v3M6 6l1 15h10l1-15M10 10v7M14 10v7" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  logout: (
    <>
      <path d="M10 17l5-5-5-5M15 12H3" />
      <path d="M14 3h7v18h-7" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" />
    </>
  ),
  image: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-5-5L5 21" />
    </>
  ),
  layers: (
    <>
      <path d="m12 2 10 5-10 5L2 7z" />
      <path d="m2 12 10 5 10-5M2 17l10 5 10-5" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </>
  ),
  close: (
    <>
      <path d="m6 6 12 12M18 6 6 18" />
    </>
  ),
};

function Icon({
  name,
  size = 20,
  className = "",
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconPaths[name]}
    </svg>
  );
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="logo">
      <span className="logo-mark">
        <span />
      </span>
      {!compact && <span>revisita</span>}
    </div>
  );
}

const navItems: { label: string; icon: IconName; page: Page }[] = [
  { label: "Início", icon: "home", page: "dashboard" },
  { label: "Meu acervo", icon: "book", page: "library" },
  { label: "Alertas", icon: "bell", page: "alerts" },
  { label: "Círculos", icon: "users", page: "circles" },
  { label: "Perfil", icon: "user", page: "profile" },
];

const subjects = [
  {
    name: "Anatomia Humana",
    semester: "3º semestre",
    count: 12,
    icon: "layers" as IconName,
    color: "lavender",
  },
  {
    name: "Bioquímica",
    semester: "3º semestre",
    count: 8,
    icon: "file" as IconName,
    color: "mint",
  },
  {
    name: "Fisiologia",
    semester: "3º semestre",
    count: 15,
    icon: "book" as IconName,
    color: "amber",
  },
  {
    name: "Microbiologia",
    semester: "3º semestre",
    count: 6,
    icon: "image" as IconName,
    color: "rose",
  },
];

const alerts = [
  {
    type: "Prova",
    title: "Prova de Anatomia",
    subject: "Anatomia Humana",
    date: "18 jun",
    time: "08:00",
    countdown: "Amanhã",
    tone: "urgent",
  },
  {
    type: "Trabalho",
    title: "Trabalho de Bioquímica",
    subject: "Bioquímica",
    date: "20 jun",
    time: "23:59",
    countdown: "Em 3 dias",
    tone: "warning",
  },
  {
    type: "Atividade",
    title: "Lista de Fisiologia",
    subject: "Fisiologia",
    date: "24 jun",
    time: "18:00",
    countdown: "Em 7 dias",
    tone: "calm",
  },
];

const circles = [
  {
    name: "Grupo de Anatomia",
    initials: "GA",
    members: 8,
    materials: 24,
    subjects: ["Anatomia", "Histologia"],
    color: "purple",
  },
  {
    name: "Estudos de Medicina",
    initials: "EM",
    members: 12,
    materials: 38,
    subjects: ["Bioquímica", "Fisiologia"],
    color: "green",
  },
  {
    name: "Nutrição — Turma 2026",
    initials: "NT",
    members: 18,
    materials: 31,
    subjects: ["Nutrição", "Microbiologia"],
    color: "orange",
  },
  {
    name: "Estudos Interfaculdades",
    initials: "EI",
    members: 6,
    materials: 15,
    subjects: ["Anatomia", "Genética"],
    color: "blue",
  },
];

function Button({
  children,
  variant = "primary",
  icon,
  onClick,
  type = "button",
  full = false,
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  icon?: IconName;
  onClick?: () => void;
  type?: "button" | "submit";
  full?: boolean;
}) {
  return (
    <button type={type} onClick={onClick} className={`button ${variant} ${full ? "full" : ""}`}>
      {icon && <Icon name={icon} size={18} />}
      {children}
    </button>
  );
}

function PageTitle({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="page-title">
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action}
    </div>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
  children,
}: {
  label: string;
  placeholder?: string;
  type?: string;
  children?: ReactNode;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      {children || <input type={type} placeholder={placeholder} />}
    </label>
  );
}

function SelectField({
  label,
  value,
  options = [],
}: {
  label: string;
  value: string;
  options?: string[];
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <div className="select-wrap">
        <select defaultValue={value}>
          <option>{value}</option>
          {options
            .filter((o) => o !== value)
            .map((o) => (
              <option key={o}>{o}</option>
            ))}
        </select>
        <Icon name="chevron" size={16} />
      </div>
    </label>
  );
}

function SearchBar({
  value,
  onChange,
  placeholder = "Buscar...",
}: {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="search">
      <Icon name="search" size={19} />
      <input value={value} onChange={(e) => onChange?.(e.target.value)} placeholder={placeholder} />
    </div>
  );
}

function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h2>{title}</h2>
          <button className="icon-button" onClick={onClose} aria-label="Fechar">
            <Icon name="close" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Sidebar({ page, navigate }: { page: Page; navigate: (page: Page) => void }) {
  return (
    <aside className="sidebar">
      <Logo />
      <nav>
        {navItems.map((item) => (
          <button
            key={item.page}
            className={
              page === item.page ||
              (item.page === "library" && ["subject", "add-material"].includes(page)) ||
              (item.page === "alerts" && ["new-alert", "alert-detail"].includes(page)) ||
              (item.page === "circles" && page === "circle-detail")
                ? "active"
                : ""
            }
            onClick={() => navigate(item.page)}
          >
            <Icon name={item.icon} />
            <span>{item.label}</span>
            {item.label === "Alertas" && <b>3</b>}
          </button>
        ))}
      </nav>
      <div className="sidebar-tip">
        <span>
          <Icon name="shield" size={17} />
        </span>
        <strong>Seus estudos, seguros.</strong>
        <p>Materiais privados por padrão.</p>
      </div>
      <button className="sidebar-user" onClick={() => navigate("profile")}>
        <span className="avatar">EM</span>
        <span>
          <strong>Esther Martins</strong>
          <small>Medicina • 3º semestre</small>
        </span>
        <Icon name="more" size={18} />
      </button>
    </aside>
  );
}

function MobileNav({ page, navigate }: { page: Page; navigate: (page: Page) => void }) {
  return (
    <nav className="mobile-nav">
      {navItems.slice(0, 4).map((item) => (
        <button
          key={item.page}
          className={
            page === item.page ||
            (item.page === "library" && ["subject", "add-material"].includes(page)) ||
            (item.page === "alerts" && ["new-alert", "alert-detail"].includes(page)) ||
            (item.page === "circles" && page === "circle-detail")
              ? "active"
              : ""
          }
          onClick={() => navigate(item.page)}
        >
          <Icon name={item.icon} size={21} />
          <span>{item.label.replace("Meu ", "")}</span>
        </button>
      ))}
    </nav>
  );
}

function AppHeader({
  navigate,
  onNotifications,
}: {
  navigate: (p: Page) => void;
  onNotifications: () => void;
}) {
  return (
    <header className="app-header">
      <div className="mobile-logo">
        <Logo />
      </div>
      <div className="header-copy">
        <small>TERÇA-FEIRA, 17 DE JUNHO</small>
        <strong>
          Olá, Esther! <span>👋</span>
        </strong>
      </div>
      <div className="header-actions">
        <button
          className="icon-button notification-button"
          onClick={onNotifications}
          aria-label="Notificações"
        >
          <Icon name="bell" />
          <i />
        </button>
        <button className="profile-button" onClick={() => navigate("profile")}>
          <span className="avatar">EM</span>
          <span>
            <strong>Esther Martins</strong>
            <small>esther@email.com</small>
          </span>
          <Icon name="chevron" size={15} />
        </button>
      </div>
    </header>
  );
}

function Dashboard({ navigate }: { navigate: (p: Page) => void }) {
  const stats = [
    {
      label: "Materiais salvos",
      value: "41",
      note: "+5 este mês",
      icon: "book" as IconName,
      color: "purple",
    },
    {
      label: "Disciplinas",
      value: "6",
      note: "3º semestre",
      icon: "layers" as IconName,
      color: "green",
    },
    {
      label: "Próximos alertas",
      value: "3",
      note: "1 é amanhã",
      icon: "bell" as IconName,
      color: "orange",
    },
    {
      label: "Círculos ativos",
      value: "4",
      note: "44 colegas",
      icon: "users" as IconName,
      color: "blue",
    },
  ];
  return (
    <div className="page dashboard">
      <div className="welcome">
        <div>
          <h1>Vamos organizar seus estudos?</h1>
          <p>Acompanhe seus prazos e continue construindo seu acervo.</p>
        </div>
        <Button icon="plus" onClick={() => navigate("add-material")}>
          Adicionar material
        </Button>
      </div>
      <div className="stats-grid">
        {stats.map((s) => (
          <div className="stat-card" key={s.label}>
            <span className={`stat-icon ${s.color}`}>
              <Icon name={s.icon} />
            </span>
            <div>
              <small>{s.label}</small>
              <strong>{s.value}</strong>
              <p>{s.note}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="dashboard-grid">
        <section className="panel commitments">
          <div className="section-head">
            <div>
              <h2>Próximos compromissos</h2>
              <p>Organize-se para o que vem por aí.</p>
            </div>
            <button className="text-button" onClick={() => navigate("alerts")}>
              Ver todos <Icon name="arrow" size={15} />
            </button>
          </div>
          <div className="commitment-list">
            {alerts.map((a, i) => (
              <div className="commitment" key={a.title}>
                <div className={`date-block ${a.tone}`}>
                  <strong>{a.date.split(" ")[0]}</strong>
                  <span>JUN</span>
                </div>
                <div className="commitment-info">
                  <span className={`tag ${a.tone}`}>{a.type}</span>
                  <strong>{a.title}</strong>
                  <small>
                    <Icon name="clock" size={14} /> {a.time} · {a.countdown}
                  </small>
                </div>
                <Button
                  variant={i === 0 ? "primary" : "secondary"}
                  onClick={() => navigate(i === 0 ? "alert-detail" : "subject")}
                >
                  Ver materiais
                </Button>
              </div>
            ))}
          </div>
        </section>
        <aside className="panel quick">
          <div className="section-head">
            <div>
              <h2>Acesso rápido</h2>
              <p>Atalhos para o seu dia.</p>
            </div>
          </div>
          <div className="quick-grid">
            {[
              ["Meu acervo", "book", "library"],
              ["Adicionar material", "plus", "add-material"],
              ["Criar alerta", "bell", "new-alert"],
              ["Meus círculos", "users", "circles"],
            ].map(([label, icon, route]) => (
              <button key={label} onClick={() => navigate(route as Page)}>
                <span>
                  <Icon name={icon as IconName} />
                </span>
                <strong>{label}</strong>
                <Icon name="arrow" size={16} />
              </button>
            ))}
          </div>
          <div className="focus-card">
            <span>
              <Icon name="calendar" />
            </span>
            <div>
              <small>FOCO DA SEMANA</small>
              <strong>Prova de Anatomia</strong>
              <p>Você já tem 12 materiais para revisar.</p>
            </div>
          </div>
        </aside>
      </div>
      <section className="subjects-section">
        <div className="section-head">
          <div>
            <h2>Minhas disciplinas</h2>
            <p>Seu semestre em um só lugar.</p>
          </div>
          <button className="text-button" onClick={() => navigate("library")}>
            Ver acervo <Icon name="arrow" size={15} />
          </button>
        </div>
        <div className="subject-grid compact">
          {subjects.map((s) => (
            <SubjectCard key={s.name} subject={s} onClick={() => navigate("subject")} />
          ))}
        </div>
      </section>
    </div>
  );
}

function SubjectCard({
  subject,
  onClick,
}: {
  subject: (typeof subjects)[number];
  onClick: () => void;
}) {
  return (
    <button className="subject-card" onClick={onClick}>
      <span className={`subject-icon ${subject.color}`}>
        <Icon name={subject.icon} />
      </span>
      <div>
        <strong>{subject.name}</strong>
        <small>{subject.semester}</small>
        <p>{subject.count} materiais</p>
      </div>
      <Icon name="arrow" className="card-arrow" size={18} />
    </button>
  );
}

function Library({ navigate }: { navigate: (p: Page) => void }) {
  const [query, setQuery] = useState("");
  const filtered = subjects.filter((s) => s.name.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="page">
      <PageTitle
        title="Meu acervo"
        description="Todos os seus materiais organizados em um só lugar."
        action={
          <Button icon="plus" onClick={() => navigate("add-material")}>
            Adicionar material
          </Button>
        }
      />
      <div className="toolbar">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Buscar material ou disciplina..."
        />
        <div className="filter-row">
          <button className="filter">
            3º semestre <Icon name="chevron" size={15} />
          </button>
          <button className="filter">
            Todas as disciplinas <Icon name="chevron" size={15} />
          </button>
          <button className="filter">
            Todos os tipos <Icon name="chevron" size={15} />
          </button>
        </div>
      </div>
      <div className="library-summary">
        <div>
          <span>
            <Icon name="book" />
          </span>
          <div>
            <strong>41 materiais</strong>
            <small>em 6 disciplinas</small>
          </div>
        </div>
        <div className="progress">
          <div>
            <span>Organização do acervo</span>
            <strong>82%</strong>
          </div>
          <i>
            <b />
          </i>
        </div>
      </div>
      <div className="section-head">
        <div>
          <h2>Disciplinas</h2>
          <p>{filtered.length} disciplinas encontradas</p>
        </div>
        <div className="view-toggle">
          <button className="active">
            <Icon name="layers" size={17} />
          </button>
          <button>
            <Icon name="menu" size={17} />
          </button>
        </div>
      </div>
      {filtered.length ? (
        <div className="subject-grid">
          {filtered.map((s) => (
            <SubjectCard key={s.name} subject={s} onClick={() => navigate("subject")} />
          ))}
        </div>
      ) : (
        <EmptyState type="search" navigate={navigate} />
      )}
    </div>
  );
}

const materials = [
  {
    topic: "Sistema ósseo",
    items: [
      { name: "Resumo — Tecido ósseo", kind: "PDF", date: "12 jun 2025", icon: "file" as IconName },
      {
        name: "Mapa mental do esqueleto axial",
        kind: "Mapa mental",
        date: "8 jun 2025",
        icon: "layers" as IconName,
      },
    ],
  },
  {
    topic: "Sistema muscular",
    items: [
      {
        name: "Flashcards — Músculos do membro superior",
        kind: "Flashcards",
        date: "2 jun 2025",
        icon: "layers" as IconName,
      },
      {
        name: "Anotações da aula prática",
        kind: "Texto",
        date: "28 mai 2025",
        icon: "book" as IconName,
      },
    ],
  },
  {
    topic: "Sistema cardiovascular",
    items: [
      {
        name: "Circulação sistêmica e pulmonar",
        kind: "Imagem",
        date: "20 mai 2025",
        icon: "image" as IconName,
      },
    ],
  },
];

function SubjectDetail({
  navigate,
  openMaterial,
}: {
  navigate: (p: Page) => void;
  openMaterial: () => void;
}) {
  const [query, setQuery] = useState("");
  return (
    <div className="page">
      <button className="back-button" onClick={() => navigate("library")}>
        <Icon name="arrow" size={17} className="back-icon" /> Voltar ao acervo
      </button>
      <div className="subject-hero">
        <div className="subject-hero-icon">
          <Icon name="layers" size={28} />
        </div>
        <div>
          <span className="eyebrow">DISCIPLINA</span>
          <h1>Anatomia Humana</h1>
          <p>Medicina · 3º semestre · 12 materiais</p>
        </div>
        <Button icon="plus" onClick={() => navigate("add-material")}>
          Adicionar material
        </Button>
      </div>
      <div className="toolbar subject-toolbar">
        <SearchBar value={query} onChange={setQuery} placeholder="Buscar em Anatomia Humana..." />
        <button className="filter">
          Mais recentes <Icon name="chevron" size={15} />
        </button>
      </div>
      <div className="topic-list">
        {materials.map((group) => (
          <section className="topic" key={group.topic}>
            <div className="topic-title">
              <div>
                <Icon name="chevron" size={16} />
                <h2>{group.topic}</h2>
                <span>{group.items.length}</span>
              </div>
              <button className="icon-button">
                <Icon name="more" />
              </button>
            </div>
            {group.items
              .filter((m) => m.name.toLowerCase().includes(query.toLowerCase()))
              .map((m) => (
                <div className="material-row" key={m.name}>
                  <span className={`material-icon ${m.kind === "PDF" ? "pdf" : ""}`}>
                    <Icon name={m.icon} />
                  </span>
                  <button className="material-name" onClick={openMaterial}>
                    <strong>{m.name}</strong>
                    <small>
                      {m.kind} · Enviado em {m.date}
                    </small>
                  </button>
                  <span className="topic-chip">{group.topic}</span>
                  <div className="row-actions">
                    <button aria-label="Visualizar" onClick={openMaterial}>
                      <Icon name="eye" />
                    </button>
                    <button aria-label="Baixar">
                      <Icon name="download" />
                    </button>
                    <button aria-label="Editar">
                      <Icon name="edit" />
                    </button>
                    <button aria-label="Excluir">
                      <Icon name="trash" />
                    </button>
                  </div>
                </div>
              ))}
          </section>
        ))}
      </div>
    </div>
  );
}

function AddMaterial({
  navigate,
  toast,
}: {
  navigate: (p: Page) => void;
  toast: (message: string) => void;
}) {
  const [file, setFile] = useState(false);
  const save = () => {
    toast("Material salvo no seu acervo.");
    navigate("subject");
  };
  return (
    <div className="page form-page">
      <button className="back-button" onClick={() => navigate("library")}>
        <Icon name="arrow" size={17} className="back-icon" /> Voltar ao acervo
      </button>
      <PageTitle title="Adicionar material" description="Guarde aquilo que você aprendeu." />
      <div className="form-card">
        <div className="form-section">
          <div className="form-section-title">
            <span>1</span>
            <div>
              <h2>Arquivo do material</h2>
              <p>Envie um documento, imagem ou foto das suas anotações.</p>
            </div>
          </div>
          <button className={`upload-zone ${file ? "uploaded" : ""}`} onClick={() => setFile(true)}>
            <span>
              <Icon name={file ? "check" : "upload"} size={26} />
            </span>
            {file ? (
              <>
                <strong>resumo-anatomia.pdf</strong>
                <p>2,4 MB · Arquivo pronto para envio</p>
              </>
            ) : (
              <>
                <strong>Arraste seu arquivo ou clique para selecionar</strong>
                <p>PDF, JPG, PNG ou DOCX · Máximo de 20 MB</p>
              </>
            )}
            <b>{file ? "Trocar arquivo" : "Selecionar arquivo"}</b>
          </button>
        </div>
        <div className="form-section">
          <div className="form-section-title">
            <span>2</span>
            <div>
              <h2>Informações</h2>
              <p>Ajude o seu eu do futuro a encontrar este material.</p>
            </div>
          </div>
          <div className="form-grid">
            <Field label="Nome do material" placeholder="Ex.: Resumo sobre tecido ósseo" />
            <SelectField label="Curso" value="Medicina" options={["Nutrição", "Biomedicina"]} />
            <SelectField
              label="Disciplina"
              value="Anatomia Humana"
              options={["Bioquímica", "Fisiologia"]}
            />
            <Field label="Assunto" placeholder="Ex.: Sistema ósseo" />
            <SelectField label="Semestre" value="3º semestre" />
            <SelectField
              label="Tipo de material"
              value="Resumo"
              options={["Mapa mental", "Flashcards", "Fichamento"]}
            />
          </div>
        </div>
        <div className="form-section">
          <div className="form-section-title">
            <span>3</span>
            <div>
              <h2>Visibilidade</h2>
              <p>Você controla quem pode acessar o seu material.</p>
            </div>
          </div>
          <div className="visibility-options">
            <label>
              <input type="radio" name="visibility" defaultChecked />
              <span>
                <Icon name="lock" />
                <b>Somente eu</b>
                <small>Privado e visível apenas no seu acervo.</small>
              </span>
            </label>
            <label>
              <input type="radio" name="visibility" />
              <span>
                <Icon name="users" />
                <b>Compartilhar em círculos</b>
                <small>Escolha um ou mais grupos privados.</small>
              </span>
            </label>
          </div>
        </div>
        <div className="authorship-note">
          <Icon name="shield" />
          <p>
            <strong>Valorize materiais autorais</strong>Compartilhe somente materiais de sua
            autoria, como resumos, mapas mentais, fichamentos e flashcards. Não envie slides de
            professores, provas ou livros digitalizados.
          </p>
        </div>
        <div className="form-actions">
          <Button variant="secondary" onClick={() => navigate("library")}>
            Cancelar
          </Button>
          <Button icon="check" onClick={save}>
            Salvar material
          </Button>
        </div>
      </div>
    </div>
  );
}

function Alerts({ navigate }: { navigate: (p: Page) => void }) {
  const [filter, setFilter] = useState("Todos");
  const filtered =
    filter === "Todos"
      ? alerts
      : alerts.filter((a) => `${a.type}s` === filter || a.type === filter.replace("s", ""));
  return (
    <div className="page">
      <PageTitle
        title="Meus alertas"
        description="Não deixe nenhuma data importante passar."
        action={
          <Button icon="plus" onClick={() => navigate("new-alert")}>
            Novo alerta
          </Button>
        }
      />
      <div className="alert-overview">
        <div className="mini-calendar">
          <div>
            <span>JUNHO 2025</span>
            <button>
              <Icon name="chevron" size={15} />
            </button>
          </div>
          <div className="calendar-days">
            <small>S</small>
            <small>T</small>
            <small>Q</small>
            <small>Q</small>
            <small>S</small>
            <small>S</small>
            <small>D</small>
            {[15, 16, 17, 18, 19, 20, 21].map((d) => (
              <b key={d} className={d === 17 ? "today" : d === 18 || d === 20 ? "event" : ""}>
                {d}
              </b>
            ))}
          </div>
        </div>
        <div className="next-callout">
          <span>
            <Icon name="bell" />
          </span>
          <div>
            <small>PRÓXIMO COMPROMISSO</small>
            <strong>Prova de Anatomia</strong>
            <p>Amanhã, às 08:00</p>
          </div>
          <Button onClick={() => navigate("alert-detail")}>Ver detalhes</Button>
        </div>
      </div>
      <div className="tabs">
        {["Todos", "Provas", "Trabalhos", "Atividades"].map((t) => (
          <button key={t} className={filter === t ? "active" : ""} onClick={() => setFilter(t)}>
            {t}
          </button>
        ))}
      </div>
      <section className="panel alert-panel">
        <h2>Próximos compromissos</h2>
        <div className="alert-list">
          {filtered.map((a, i) => (
            <button
              className="alert-row"
              key={a.title}
              onClick={() => i === 0 && navigate("alert-detail")}
            >
              <span className={`alert-status ${a.tone}`}>
                <Icon
                  name={a.type === "Prova" ? "book" : a.type === "Trabalho" ? "file" : "check"}
                />
              </span>
              <span className="alert-main">
                <span className={`tag ${a.tone}`}>{a.type}</span>
                <strong>{a.title}</strong>
                <small>{a.subject}</small>
              </span>
              <span className="alert-date">
                <strong>{a.date}</strong>
                <small>{a.time}</small>
              </span>
              <span className={`countdown ${a.tone}`}>{a.countdown}</span>
              <span className="alert-notify">
                <Icon name="bell" size={15} /> 7, 3 e 1 dia antes
              </span>
              <Icon name="arrow" size={18} />
            </button>
          ))}
        </div>
      </section>
      <section className="history">
        <div className="section-head">
          <div>
            <h2>Histórico</h2>
            <p>Compromissos concluídos recentemente.</p>
          </div>
          <button className="text-button">Ver histórico</button>
        </div>
      </section>
    </div>
  );
}

function NewAlert({
  navigate,
  toast,
}: {
  navigate: (p: Page) => void;
  toast: (m: string) => void;
}) {
  const [selected, setSelected] = useState(["7 dias antes"]);
  const toggle = (value: string) =>
    setSelected((old) => (old.includes(value) ? old.filter((v) => v !== value) : [...old, value]));
  const save = () => {
    toast("Alerta criado com sucesso.");
    navigate("alerts");
  };
  return (
    <div className="page form-page">
      <button className="back-button" onClick={() => navigate("alerts")}>
        <Icon name="arrow" size={17} className="back-icon" /> Voltar aos alertas
      </button>
      <PageTitle
        title="Novo alerta"
        description="Cadastre uma data importante e receba lembretes no momento certo."
      />
      <div className="form-card alert-form">
        <div className="form-section">
          <div className="form-section-title">
            <span>1</span>
            <div>
              <h2>Sobre o compromisso</h2>
              <p>Conte o que vem por aí.</p>
            </div>
          </div>
          <div className="type-options">
            {[
              ["Prova", "book"],
              ["Trabalho", "file"],
              ["Atividade", "check"],
            ].map(([label, icon], i) => (
              <label key={label}>
                <input name="type" type="radio" defaultChecked={i === 0} />
                <span>
                  <Icon name={icon as IconName} />
                  <b>{label}</b>
                </span>
              </label>
            ))}
          </div>
          <div className="form-grid">
            <Field label="Nome do compromisso" placeholder="Ex.: Prova do sistema locomotor" />
            <SelectField
              label="Disciplina"
              value="Anatomia Humana"
              options={["Bioquímica", "Fisiologia"]}
            />
            <Field label="Data" type="date" />
            <Field label="Horário (opcional)" type="time" />
          </div>
        </div>
        <div className="form-section">
          <div className="form-section-title">
            <span>2</span>
            <div>
              <h2>Quando lembrar?</h2>
              <p>Selecione uma ou mais opções.</p>
            </div>
          </div>
          <div className="chip-row">
            {["15 dias antes", "7 dias antes", "3 dias antes", "1 dia antes", "No dia"].map(
              (chip) => (
                <button
                  key={chip}
                  className={selected.includes(chip) ? "selected" : ""}
                  onClick={() => toggle(chip)}
                >
                  {selected.includes(chip) && <Icon name="check" size={15} />}
                  {chip}
                </button>
              ),
            )}
          </div>
        </div>
        <div className="notification-preview">
          <span>
            <Icon name="bell" />
          </span>
          <div>
            <small>PRÉVIA DA NOTIFICAÇÃO</small>
            <strong>Prova de Anatomia se aproximando</strong>
            <p>Você será lembrado sobre sua prova de Anatomia com 7 dias de antecedência.</p>
          </div>
        </div>
        <div className="form-actions">
          <Button variant="secondary" onClick={() => navigate("alerts")}>
            Cancelar
          </Button>
          <Button icon="check" onClick={save}>
            Salvar alerta
          </Button>
        </div>
      </div>
    </div>
  );
}

function AlertDetail({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <div className="page alert-detail-page">
      <button className="back-button" onClick={() => navigate("alerts")}>
        <Icon name="arrow" size={17} className="back-icon" /> Voltar aos alertas
      </button>
      <div className="alert-detail-card">
        <div className="alert-detail-top">
          <span className="large-alert-icon">
            <Icon name="book" size={30} />
          </span>
          <span className="tag urgent">PROVA</span>
          <h1>Prova de Anatomia</h1>
          <p>Amanhã, às 08h</p>
          <div className="countdown-box">
            <span>FALTAM</span>
            <strong>18h 42min</strong>
            <small>Você consegue. Seu material já está organizado.</small>
          </div>
        </div>
        <div className="detail-grid">
          <div>
            <small>DISCIPLINA</small>
            <strong>Anatomia Humana</strong>
          </div>
          <div>
            <small>DATA E HORÁRIO</small>
            <strong>18 de junho · 08:00</strong>
          </div>
          <div className="wide">
            <small>OBSERVAÇÕES</small>
            <p>Conteúdo: sistema ósseo, articulações e músculos dos membros superiores.</p>
          </div>
        </div>
        <div className="related-box">
          <div className="related-head">
            <span>
              <Icon name="layers" />
            </span>
            <div>
              <small>MATERIAIS RELACIONADOS</small>
              <h2>Você tem 12 materiais de Anatomia</h2>
              <p>Resumos, mapas mentais e flashcards prontos para revisar.</p>
            </div>
          </div>
          <div className="related-preview">
            {materials.slice(0, 2).map((group) => (
              <div key={group.topic}>
                <Icon name="file" />
                <span>
                  <strong>{group.items[0].name}</strong>
                  <small>{group.topic}</small>
                </span>
              </div>
            ))}
          </div>
          <Button full icon="book" onClick={() => navigate("subject")}>
            Abrir meus materiais
          </Button>
        </div>
        <div className="detail-actions">
          <Button variant="ghost" icon="edit">
            Editar alerta
          </Button>
          <Button variant="ghost" icon="trash">
            Excluir alerta
          </Button>
        </div>
      </div>
    </div>
  );
}

function Circles({
  navigate,
  openCreate,
}: {
  navigate: (p: Page) => void;
  openCreate: () => void;
}) {
  return (
    <div className="page">
      <PageTitle
        title="Meus círculos"
        description="Estude junto com pessoas que compartilham os mesmos objetivos."
        action={
          <div className="split-actions">
            <Button variant="secondary" icon="users">
              Entrar por convite
            </Button>
            <Button icon="plus" onClick={openCreate}>
              Criar círculo
            </Button>
          </div>
        }
      />
      <div className="privacy-banner">
        <span>
          <Icon name="shield" />
        </span>
        <div>
          <strong>Compartilhamento privado e seguro</strong>
          <p>
            Seus círculos são fechados. Somente pessoas convidadas podem participar e acessar
            materiais.
          </p>
        </div>
      </div>
      <div className="circle-grid">
        {circles.map((c, i) => (
          <button className="circle-card" key={c.name} onClick={() => navigate("circle-detail")}>
            <div className="circle-top">
              <span className={`circle-avatar ${c.color}`}>{c.initials}</span>
              <span className="private-chip">
                <Icon name="lock" size={13} /> Privado
              </span>
            </div>
            <h2>{c.name}</h2>
            <div className="circle-stats">
              <span>
                <Icon name="users" size={16} /> {c.members} membros
              </span>
              <span>
                <Icon name="file" size={16} /> {c.materials} materiais
              </span>
            </div>
            <div className="circle-subjects">
              {c.subjects.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
            <div className="circle-footer">
              <div className="avatar-stack">
                {["AM", "JC", "LF"].map((a) => (
                  <i key={a}>{a}</i>
                ))}
              </div>
              <strong>
                Abrir círculo <Icon name="arrow" size={15} />
              </strong>
            </div>
            {i === 0 && <b className="new-dot">2 novos</b>}
          </button>
        ))}
      </div>
      <div className="invite-card">
        <span>
          <Icon name="users" size={25} />
        </span>
        <div>
          <h2>Tem um convite?</h2>
          <p>Cole o código ou link recebido para entrar em um círculo privado.</p>
        </div>
        <Button variant="secondary">Entrar por convite</Button>
      </div>
    </div>
  );
}

function CircleDetail({
  navigate,
  toast,
}: {
  navigate: (p: Page) => void;
  toast: (m: string) => void;
}) {
  const [tab, setTab] = useState("Materiais");
  return (
    <div className="page">
      <button className="back-button" onClick={() => navigate("circles")}>
        <Icon name="arrow" size={17} className="back-icon" /> Voltar aos círculos
      </button>
      <div className="circle-hero">
        <span className="circle-avatar purple">GA</span>
        <div>
          <div className="circle-title-line">
            <h1>Grupo de Anatomia</h1>
            <span className="private-chip">
              <Icon name="lock" size={13} /> Privado
            </span>
          </div>
          <p>Espaço para compartilhar resumos autorais e estudar Anatomia juntos.</p>
          <div>
            <span>
              <Icon name="user" size={15} /> Administrado por Ana Martins
            </span>
            <span>
              <Icon name="users" size={15} /> 8 participantes
            </span>
          </div>
        </div>
        <Button icon="plus" onClick={() => toast("Link de convite copiado.")}>
          Convidar participantes
        </Button>
      </div>
      <div className="tabs circle-tabs">
        {["Materiais", "Participantes", "Sobre"].map((t) => (
          <button className={tab === t ? "active" : ""} onClick={() => setTab(t)} key={t}>
            {t}
          </button>
        ))}
      </div>
      {tab === "Materiais" ? (
        <>
          <div className="contribution-note">
            <span>
              <Icon name="shield" />
            </span>
            <p>
              <strong>Uma troca que beneficia todo mundo</strong>Para acessar materiais de uma
              disciplina, contribua com pelo menos um material autoral nela. Assim, o círculo cresce
              com qualidade e colaboração.
            </p>
          </div>
          <div className="circle-material-grid">
            <section className="circle-discipline unlocked">
              <div className="circle-discipline-head">
                <span>
                  <Icon name="layers" />
                </span>
                <div>
                  <h2>Anatomia Humana</h2>
                  <p>18 materiais · Você contribuiu</p>
                </div>
                <span className="success-chip">
                  <Icon name="check" size={14} /> Liberado
                </span>
              </div>
              <div className="shared-items">
                {materials[0].items.map((m) => (
                  <button key={m.name}>
                    <Icon name={m.icon} />
                    <span>
                      <strong>{m.name}</strong>
                      <small>por Ana Martins · {m.kind}</small>
                    </span>
                    <Icon name="eye" />
                  </button>
                ))}
              </div>
              <Button variant="secondary" full>
                Ver todos os 18 materiais
              </Button>
            </section>
            <section className="circle-discipline locked">
              <div className="circle-discipline-head">
                <span>
                  <Icon name="book" />
                </span>
                <div>
                  <h2>Histologia</h2>
                  <p>6 materiais compartilhados</p>
                </div>
                <span className="locked-chip">
                  <Icon name="lock" size={14} /> Aguardando contribuição
                </span>
              </div>
              <div className="locked-content">
                <span>
                  <Icon name="lock" size={25} />
                </span>
                <h3>Contribua para abrir esta coleção</h3>
                <p>
                  Envie um resumo, mapa mental ou fichamento autoral de Histologia para acessar os
                  materiais do grupo.
                </p>
                <Button icon="upload" onClick={() => navigate("add-material")}>
                  Enviar meu material
                </Button>
              </div>
            </section>
          </div>
        </>
      ) : tab === "Participantes" ? (
        <div className="panel member-list">
          {[
            "Ana Martins — Administradora",
            "Esther Martins",
            "João Carvalho",
            "Luiza Ferreira",
            "Pedro Lima",
          ].map((m, i) => (
            <div key={m}>
              <span className="avatar">
                {m
                  .split(" ")
                  .map((p) => p[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              <strong>{m}</strong>
              {i === 0 && <span className="success-chip">Admin</span>}
            </div>
          ))}
        </div>
      ) : (
        <div className="panel about-circle">
          <h2>Sobre este círculo</h2>
          <p>
            Criado para organizar materiais autorais de Anatomia e Histologia da turma. Este é um
            ambiente privado, acessível apenas por convite.
          </p>
          <h3>Disciplinas disponíveis</h3>
          <div className="circle-subjects">
            <span>Anatomia Humana</span>
            <span>Histologia</span>
          </div>
        </div>
      )}
    </div>
  );
}

function Profile({ navigate, toast }: { navigate: (p: Page) => void; toast: (m: string) => void }) {
  const [section, setSection] = useState("Dados pessoais");
  const sections = [
    ["Dados pessoais", "user"],
    ["Notificações", "bell"],
    ["Privacidade", "shield"],
    ["Meus círculos", "users"],
    ["Compartilhamento", "layers"],
    ["Segurança", "lock"],
  ] as [string, IconName][];
  return (
    <div className="page">
      <PageTitle
        title="Perfil e configurações"
        description="Gerencie seus dados e preferências do Revisita."
      />
      <div className="profile-layout">
        <aside className="profile-menu">
          <div className="profile-summary">
            <span className="avatar large">EM</span>
            <strong>Esther Martins</strong>
            <small>esther@email.com</small>
          </div>
          {sections.map(([s, icon]) => (
            <button key={s} className={section === s ? "active" : ""} onClick={() => setSection(s)}>
              <Icon name={icon} size={18} /> {s}
              <Icon name="arrow" size={15} />
            </button>
          ))}
          <button className="logout" onClick={() => location.reload()}>
            <Icon name="logout" size={18} /> Sair da conta
          </button>
        </aside>
        <main className="settings-panel">
          {section === "Dados pessoais" ? (
            <>
              <div className="settings-title">
                <div>
                  <h2>Dados pessoais</h2>
                  <p>Mantenha suas informações acadêmicas atualizadas.</p>
                </div>
              </div>
              <div className="photo-row">
                <span className="avatar xl">EM</span>
                <div>
                  <Button variant="secondary">Alterar foto</Button>
                  <small>JPG ou PNG · Máximo de 5 MB</small>
                </div>
              </div>
              <div className="form-grid">
                <Field label="Nome completo" placeholder="Esther Martins" />
                <Field label="E-mail" placeholder="esther@email.com" />
                <Field label="Instituição de ensino" placeholder="Universidade Central" />
                <Field label="Curso" placeholder="Medicina" />
                <SelectField label="Semestre atual" value="3º semestre" />
              </div>
              <div className="settings-actions">
                <Button onClick={() => toast("Alterações salvas.")}>Salvar alterações</Button>
              </div>
            </>
          ) : section === "Privacidade" ? (
            <>
              <div className="settings-title">
                <h2>Privacidade</h2>
                <p>Controle como seus materiais são visualizados.</p>
              </div>
              <div className="privacy-large">
                <Icon name="shield" size={28} />
                <div>
                  <strong>Privado por padrão</strong>
                  <p>
                    Seus materiais são privados por padrão. Somente pessoas autorizadas podem
                    visualizar conteúdos compartilhados em círculos.
                  </p>
                </div>
              </div>
              <SettingToggle
                title="Solicitar confirmação antes de compartilhar"
                text="Evita compartilhamentos acidentais em círculos."
                checked
              />
              <SettingToggle
                title="Mostrar instituição no perfil do círculo"
                text="Participantes dos seus círculos poderão ver sua universidade."
                checked
              />
            </>
          ) : (
            <>
              <div className="settings-title">
                <h2>{section}</h2>
                <p>Personalize suas preferências de {section.toLowerCase()}.</p>
              </div>
              <SettingToggle
                title={
                  section === "Notificações"
                    ? "Lembretes de compromissos"
                    : "Proteção adicional da conta"
                }
                text={
                  section === "Notificações"
                    ? "Receba alertas nos períodos selecionados."
                    : "Mantenha sua experiência segura e sob controle."
                }
                checked
              />
              <SettingToggle
                title={
                  section === "Compartilhamento"
                    ? "Confirmar autoria do material"
                    : "Atualizações importantes"
                }
                text="Você pode alterar esta preferência a qualquer momento."
                checked
              />
              <div className="settings-actions">
                <Button onClick={() => toast("Preferências atualizadas.")}>
                  Salvar preferências
                </Button>
              </div>
            </>
          )}
        </main>
      </div>
      <button className="empty-demo-link" onClick={() => navigate("empty")}>
        Visualizar demonstração de estados vazios
      </button>
    </div>
  );
}

function SettingToggle({
  title,
  text,
  checked,
}: {
  title: string;
  text: string;
  checked?: boolean;
}) {
  return (
    <label className="setting-toggle">
      <span>
        <strong>{title}</strong>
        <small>{text}</small>
      </span>
      <input type="checkbox" defaultChecked={checked} />
      <i />
    </label>
  );
}

function EmptyState({ type, navigate }: { type: string; navigate: (p: Page) => void }) {
  const content: Record<string, [IconName, string, string, string, Page]> = {
    library: [
      "book",
      "Seu acervo está esperando seus primeiros materiais.",
      "Comece guardando um resumo, mapa mental ou fichamento autoral.",
      "Adicionar material",
      "add-material",
    ],
    subjects: [
      "layers",
      "Nenhuma disciplina cadastrada.",
      "Adicione seu primeiro material e organize-o por disciplina.",
      "Adicionar disciplina",
      "add-material",
    ],
    alerts: [
      "bell",
      "Você ainda não possui alertas.",
      "Cadastre uma prova ou atividade para começar.",
      "Criar alerta",
      "new-alert",
    ],
    circle: [
      "users",
      "Este círculo ainda não possui materiais compartilhados.",
      "Seja a primeira pessoa a contribuir com um material autoral.",
      "Enviar material",
      "add-material",
    ],
    search: [
      "search",
      "Nenhum resultado encontrado.",
      "Tente outro termo ou ajuste os filtros da busca.",
      "Limpar busca",
      "library",
    ],
  };
  const [icon, title, text, action, page] = content[type];
  return (
    <div className="empty-state">
      <div className="empty-illustration">
        <span />
        <Icon name={icon} size={32} />
        <i />
      </div>
      <h2>{title}</h2>
      <p>{text}</p>
      <Button icon="plus" onClick={() => navigate(page)}>
        {action}
      </Button>
    </div>
  );
}

function EmptyStates({ navigate }: { navigate: (p: Page) => void }) {
  const [tab, setTab] = useState("library");
  return (
    <div className="page">
      <button className="back-button" onClick={() => navigate("profile")}>
        <Icon name="arrow" size={17} className="back-icon" /> Voltar às configurações
      </button>
      <PageTitle
        title="Estados vazios"
        description="Mensagens claras para orientar cada próximo passo."
      />
      <div className="tabs">
        {[
          ["library", "Acervo"],
          ["subjects", "Disciplinas"],
          ["alerts", "Alertas"],
          ["circle", "Círculo"],
          ["search", "Pesquisa"],
        ].map(([key, label]) => (
          <button key={key} className={tab === key ? "active" : ""} onClick={() => setTab(key)}>
            {label}
          </button>
        ))}
      </div>
      <div className="panel empty-showcase">
        <EmptyState type={tab} navigate={navigate} />
      </div>
    </div>
  );
}

function Auth({ onEnter }: { onEnter: () => void }) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="auth-page">
      <div className="auth-brand">
        <Logo />
        <div className="auth-brand-copy">
          <span className="brand-icon">
            <Icon name="book" size={34} />
          </span>
          <h1>
            Seu conhecimento
            <br />
            merece ser guardado.
          </h1>
          <p>Organize materiais, conecte prazos e estude com mais tranquilidade.</p>
          <div className="brand-points">
            <span>
              <Icon name="check" /> Acervo acadêmico organizado
            </span>
            <span>
              <Icon name="check" /> Alertas conectados aos materiais
            </span>
            <span>
              <Icon name="shield" /> Compartilhamento sempre privado
            </span>
          </div>
        </div>
        <small>© 2025 Revisita · Feito para quem aprende todos os dias.</small>
      </div>
      <main className="auth-main">
        <div className="auth-mobile-logo">
          <Logo />
        </div>
        <div className={`auth-card ${mode === "register" ? "register" : ""}`}>
          <span className="auth-eyebrow">
            {mode === "login" ? "BEM-VINDA DE VOLTA" : "COMECE AGORA"}
          </span>
          <h2>{mode === "login" ? "Entre na sua conta" : "Crie sua conta"}</h2>
          <p>
            {mode === "login"
              ? "Continue de onde parou e mantenha seus estudos em dia."
              : "Organize sua vida acadêmica em poucos passos."}
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onEnter();
            }}
          >
            {mode === "register" && (
              <Field label="Nome completo" placeholder="Como você gostaria de ser chamada?" />
            )}
            <Field label="E-mail" type="email" placeholder="seu@email.com" />
            <label className="field">
              <span>Senha</span>
              <div className="password-input">
                <input type={showPassword ? "text" : "password"} placeholder="Digite sua senha" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                  <Icon name="eye" />
                </button>
              </div>
            </label>
            {mode === "register" && (
              <div className="auth-form-grid">
                <Field label="Instituição de ensino" placeholder="Sua universidade" />
                <Field label="Curso" placeholder="Seu curso" />
                <SelectField
                  label="Semestre atual"
                  value="3º semestre"
                  options={["1º semestre", "2º semestre", "4º semestre"]}
                />
              </div>
            )}
            {mode === "login" && (
              <div className="form-meta">
                <label>
                  <input type="checkbox" /> Lembrar de mim
                </label>
                <button type="button">Esqueci minha senha</button>
              </div>
            )}
            <Button full type="submit">
              {mode === "login" ? "Entrar" : "Criar minha conta"}
              <Icon name="arrow" size={17} />
            </Button>
          </form>
          <div className="auth-switch">
            {mode === "login" ? "Ainda não tem uma conta?" : "Já possui uma conta?"}{" "}
            <button onClick={() => setMode(mode === "login" ? "register" : "login")}>
              {mode === "login" ? "Criar minha conta" : "Entrar"}
            </button>
          </div>
          <div className="auth-security">
            <Icon name="shield" size={15} /> Seus dados e materiais permanecem privados.
          </div>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [page, setPage] = useState<Page>("dashboard");
  const [modal, setModal] = useState<"notifications" | "material" | "circle" | null>(null);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = (next: Page) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const toast = (message: string) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(""), 2600);
  };
  const content = useMemo(() => {
    const props = { navigate };
    switch (page) {
      case "dashboard":
        return <Dashboard {...props} />;
      case "library":
        return <Library {...props} />;
      case "subject":
        return <SubjectDetail {...props} openMaterial={() => setModal("material")} />;
      case "add-material":
        return <AddMaterial {...props} toast={toast} />;
      case "alerts":
        return <Alerts {...props} />;
      case "new-alert":
        return <NewAlert {...props} toast={toast} />;
      case "alert-detail":
        return <AlertDetail {...props} />;
      case "circles":
        return <Circles {...props} openCreate={() => setModal("circle")} />;
      case "circle-detail":
        return <CircleDetail {...props} toast={toast} />;
      case "profile":
        return <Profile {...props} toast={toast} />;
      case "empty":
        return <EmptyStates {...props} />;
    }
  }, [page]);

  if (!authenticated) return <Auth onEnter={() => setAuthenticated(true)} />;
  return (
    <div className="app-shell">
      <Sidebar page={page} navigate={navigate} />
      <div className="app-main">
        <AppHeader navigate={navigate} onNotifications={() => setModal("notifications")} />
        {content}
      </div>
      <MobileNav page={page} navigate={navigate} />
      {modal === "notifications" && (
        <Modal title="Notificações" onClose={() => setModal(null)}>
          <div className="notification-list">
            <button
              onClick={() => {
                setModal(null);
                navigate("alert-detail");
              }}
            >
              <span className="urgent">
                <Icon name="bell" />
              </span>
              <div>
                <strong>Prova de Anatomia amanhã</strong>
                <p>Você tem 12 materiais disponíveis para revisar.</p>
                <small>Há 5 minutos</small>
              </div>
            </button>
            <button>
              <span className="success">
                <Icon name="users" />
              </span>
              <div>
                <strong>Novo material no círculo</strong>
                <p>Ana compartilhou um resumo em Anatomia.</p>
                <small>Há 2 horas</small>
              </div>
            </button>
          </div>
        </Modal>
      )}
      {modal === "material" && (
        <Modal title="Visualizar material" onClose={() => setModal(null)}>
          <div className="material-preview">
            <div>
              <Icon name="file" size={42} />
            </div>
            <span className="tag calm">PDF</span>
            <h3>Resumo — Tecido ósseo</h3>
            <p>
              Este protótipo demonstra a visualização segura do seu material. O arquivo original
              permaneceria privado no seu acervo.
            </p>
            <Button full icon="download" onClick={() => toast("Download iniciado.")}>
              Baixar material
            </Button>
          </div>
        </Modal>
      )}
      {modal === "circle" && (
        <Modal title="Criar novo círculo" onClose={() => setModal(null)}>
          <div className="modal-form">
            <Field label="Nome do círculo" placeholder="Ex.: Grupo de estudos de Anatomia" />
            <Field label="Descrição" placeholder="Qual é o objetivo deste círculo?" />
            <SelectField label="Privacidade" value="Privado — apenas por convite" />
            <div className="authorship-note">
              <Icon name="lock" />
              <p>
                <strong>Um espaço fechado</strong>Somente pessoas com seu convite poderão entrar e
                acessar conteúdos compartilhados.
              </p>
            </div>
            <div className="form-actions">
              <Button variant="secondary" onClick={() => setModal(null)}>
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  setModal(null);
                  toast("Círculo criado com sucesso.");
                }}
              >
                Criar círculo
              </Button>
            </div>
          </div>
        </Modal>
      )}
      {toastMessage && (
        <div className="toast">
          <span>
            <Icon name="check" size={17} />
          </span>
          {toastMessage}
        </div>
      )}
    </div>
  );
}
