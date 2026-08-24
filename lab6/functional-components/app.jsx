const news = [
    {
        id: 1,
        title: "В городе открылась новая библиотека",
        category: "Культура",
        text: "В библиотеке появились новые читальные залы и пространство для проведения встреч."
    },
    {
        id: 2,
        title: "Предприятия увеличили выпуск продукции",
        category: "Экономика",
        text: "Предприятия обновили оборудование и увеличили объёмы производства."
    },
    {
        id: 3,
        title: "В парке завершили благоустройство",
        category: "Город",
        text: "В парке установили освещение, скамейки и новые навигационные указатели."
    },
    {
        id: 4,
        title: "Городская команда победила в турнире",
        category: "Спорт",
        text: "Спортсмены заняли первое место в областных соревнованиях."
    }
];

function Header() {
    return (
        <header className="site-header">
            <h1>Новостной портал</h1>
            <p>Сайт на функциональных React-компонентах</p>
        </header>
    );
}

function Navigation(props) {
    return (
        <nav className="navigation">
            <button
                className={props.section === "latest" ? "active" : ""}
                onClick={() => props.onChange("latest")}
            >
                Последние новости
            </button>
            <button
                className={props.section === "popular" ? "active" : ""}
                onClick={() => props.onChange("popular")}
            >
                Популярные новости
            </button>
        </nav>
    );
}

function NewsCard(props) {
    return (
        <article className="news-card">
            <span className="category">{props.item.category}</span>
            <h3>{props.item.title}</h3>
            <p>{props.item.text}</p>
        </article>
    );
}

function NewsList(props) {
    return (
        <section>
            <h2 id="main-title">{props.title}</h2>
            <div className="news-list">
                {props.items.map(item => (
                    <NewsCard key={item.id} item={item} />
                ))}
            </div>
        </section>
    );
}

function Footer() {
    return <footer>Новостной портал 2026</footer>;
}

function App() {
    const [section, setSection] = React.useState("latest");
    const isLatest = section === "latest";
    const displayedNews = isLatest ? news : news.filter(item => item.id === 1 || item.id === 4);

    return (
        <div className="page">
            <Header />
            <Navigation section={section} onChange={setSection} />
            <main>
                <NewsList
                    title={isLatest ? "Последние новости" : "Популярные новости"}
                    items={displayedNews}
                />
                {displayedNews.length === 0 && <p>В этом разделе пока нет новостей.</p>}
            </main>
            <Footer />
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
