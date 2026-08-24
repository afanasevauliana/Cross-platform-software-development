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

class Header extends React.Component {
    render() {
        return (
            <header className="site-header">
                <h1>Новостной портал</h1>
                <p>Сайт на классовых React-компонентах</p>
            </header>
        );
    }
}

class Navigation extends React.Component {
    render() {
        return (
            <nav className="navigation">
                <button
                    className={this.props.section === "latest" ? "active" : ""}
                    onClick={() => this.props.onChange("latest")}
                >
                    Последние новости
                </button>
                <button
                    className={this.props.section === "popular" ? "active" : ""}
                    onClick={() => this.props.onChange("popular")}
                >
                    Популярные новости
                </button>
            </nav>
        );
    }
}

class NewsCard extends React.Component {
    render() {
        const item = this.props.item;

        return (
            <article className="news-card">
                <span className="category">{item.category}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
            </article>
        );
    }
}

class NewsList extends React.Component {
    render() {
        return (
            <section>
                <h2 id="main-title">{this.props.title}</h2>
                <div className="news-list">
                    {this.props.items.map(item => (
                        <NewsCard key={item.id} item={item} />
                    ))}
                </div>
            </section>
        );
    }
}

class Footer extends React.Component {
    render() {
        return <footer>Новостной портал 2026</footer>;
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { section: "latest" };
    }

    changeSection = section => {
        this.setState({ section: section });
    };

    render() {
        const isLatest = this.state.section === "latest";
        const displayedNews = isLatest ? news : news.filter(item => item.id === 1 || item.id === 4);

        return (
            <div className="page">
                <Header />
                <Navigation section={this.state.section} onChange={this.changeSection} />
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
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
