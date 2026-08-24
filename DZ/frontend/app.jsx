const api = axios.create({
    baseURL: "/api"
});

function Header(props) {
    return (
        <header className="site-header">
            <h1>Новостной портал</h1>
            <p>Последние события города</p>
            {props.username && <p>Пользователь: {props.username}</p>}
        </header>
    );
}

function AuthForm(props) {
    const [mode, setMode] = React.useState("login");
    const [message, setMessage] = React.useState("");

    async function submit(values, actions) {
        setMessage("");
        try {
            const response = await api.post(`/auth/${mode}`, {
                username: values.username,
                password: values.password
            });
            props.onLogin(response.data.username);
        } catch (error) {
            setMessage(error.response?.data?.message || "Не удалось выполнить запрос");
        }
        actions.setSubmitting(false);
    }

    return (
        <main className="auth-page">
            <h2>{mode === "login" ? "Вход" : "Регистрация"}</h2>
            <Formik.Formik
                initialValues={{ username: "", password: "", passwordRepeat: "" }}
                validate={values => {
                    const errors = {};
                    if (!values.username.trim()) errors.username = "Введите логин";
                    if (!values.password) errors.password = "Введите пароль";
                    if (mode === "register" && values.password !== values.passwordRepeat) {
                        errors.passwordRepeat = "Пароли не совпадают";
                    }
                    return errors;
                }}
                onSubmit={submit}
            >
                {({ errors, touched, isSubmitting }) => (
                    <Formik.Form className="form">
                        <label htmlFor="username">Логин</label>
                        <Formik.Field id="username" name="username" />
                        {touched.username && errors.username && <span className="error">{errors.username}</span>}

                        <label htmlFor="password">Пароль</label>
                        <Formik.Field id="password" name="password" type="password" />
                        {touched.password && errors.password && <span className="error">{errors.password}</span>}

                        {mode === "register" && (
                            <>
                                <label htmlFor="password-repeat">Повторите пароль</label>
                                <Formik.Field id="password-repeat" name="passwordRepeat" type="password" />
                                {touched.passwordRepeat && errors.passwordRepeat && (
                                    <span className="error">{errors.passwordRepeat}</span>
                                )}
                            </>
                        )}

                        <button type="submit" disabled={isSubmitting}>
                            {mode === "login" ? "Войти" : "Зарегистрироваться"}
                        </button>
                    </Formik.Form>
                )}
            </Formik.Formik>
            {message && <p className="message error">{message}</p>}
            <button
                className="link-button"
                onClick={() => {
                    setMessage("");
                    setMode(mode === "login" ? "register" : "login");
                }}
            >
                {mode === "login" ? "Создать аккаунт" : "Уже есть аккаунт"}
            </button>
        </main>
    );
}

function Navigation(props) {
    return (
        <nav className="navigation">
            <button
                className={props.section === "home" ? "active" : ""}
                onClick={() => props.onChange("home")}
            >
                Главная
            </button>
            <button
                className={props.section === "economics" ? "active" : ""}
                onClick={() => props.onChange("economics")}
            >
                Экономика
            </button>
            <button
                className={props.section === "culture" ? "active" : ""}
                onClick={() => props.onChange("culture")}
            >
                Культура
            </button>
            <button
                className={props.section === "add" ? "active" : ""}
                onClick={() => props.onChange("add")}
            >
                Добавить новость
            </button>
            <button onClick={props.onLogout}>Выйти</button>
        </nav>
    );
}

function PageBanner(props) {
    return (
        <img className="page-banner" src={props.src} alt={props.alt} />
    );
}

function HomePage(props) {
    return (
        <section>
            <PageBanner
                src="/Cross-platform-software-development/DZ/frontend/images/i.webp"
                alt="Новостной портал"
            />
            <h2 id="main-title">Последние новости</h2>
            <ul>
                <li>В Москве открылся новый культурный центр</li>
                <li>Курс рубля вырос по отношению к доллару</li>
                <li>Вышел трейлер долгожданного фильма</li>
                <li>Открылась выставка современного искусства</li>
            </ul>
            <p>На главной странице собраны материалы из разных разделов сайта. Здесь можно быстро ознакомиться с основными событиями, а затем перейти к новостям экономики или культуры.</p>
            <p>Подборка регулярно дополняется новыми заметками. Для удобства читателей самые интересные материалы недели представлены в рейтинге ниже.</p>

            <h3>В городе благоустроили новую прогулочную зону</h3>
            <p>В общественном пространстве появились пешеходные дорожки, скамейки и дополнительное освещение. Для посетителей также оборудовали небольшую спортивную площадку и место для проведения городских мероприятий.</p>
            <p>Работы по озеленению территории продолжатся в течение сезона. Планируется высадить деревья и цветы, а также установить дополнительные урны и навигационные указатели.</p>

            <h3>Школьники представили проекты на фестивале технологий</h3>
            <p>Участники показали учебных роботов, мобильные приложения и модели умных устройств. Эксперты оценивали практическую пользу проектов, качество исполнения и умение авторов представить свою идею.</p>
            <p>Лучшие разработки рекомендовали для участия в региональном конкурсе. Для всех участников организовали мастер-классы по программированию и созданию электронных устройств.</p>

            <h3>В городе обновили парк общественного транспорта</h3>
            <p>На городские маршруты вышли новые автобусы с просторными салонами, удобными сиденьями и информационными экранами. Транспорт оборудован низким полом, поэтому им удобнее пользоваться пассажирам с колясками и людям с ограниченными возможностями здоровья.</p>
            <p>В салонах работают системы отопления и кондиционирования, а остановки объявляются автоматически. Для оплаты проезда можно использовать транспортные и банковские карты.</p>
            <p>Новые машины распределили между наиболее загруженными маршрутами. Это должно сократить интервалы движения в утренние и вечерние часы.</p>
            <p>В дальнейшем транспортные предприятия планируют продолжить обновление автобусного парка и провести дополнительное обучение водителей.</p>
            <p>Пассажиры могут оставить предложения по работе маршрутов через городскую справочную службу.</p>

            <h2>Рейтинг новостей недели</h2>
            <table>
                <thead>
                    <tr><th>Место</th><th>Новость</th><th>Оценка</th></tr>
                </thead>
                <tbody>
                    <tr><td>1</td><td>Открытие культурного центра</td><td>⭐ 4.9</td></tr>
                    <tr><td>2</td><td>Курс рубля вырос</td><td>⭐ 4.7</td></tr>
                    <tr><td>3</td><td>Благоустройство новой прогулочной зоны</td><td>⭐ 4.8</td></tr>
                    <tr><td>4</td><td>Фестиваль школьных технологических проектов</td><td>⭐ 4.9</td></tr>
                    <tr><td>5</td><td>Расширение выпуска отечественной продукции</td><td>⭐ 4.6</td></tr>
                    <tr><td>6</td><td>Выставка молодых художников</td><td>⭐ 4.7</td></tr>
                    <tr><td colSpan="2"><strong>Средняя оценка</strong></td><td><strong>⭐ 4.8</strong></td></tr>
                </tbody>
            </table>

            <h2>Новости пользователей</h2>
            <table>
                <thead>
                    <tr>
                        <th>Новость</th>
                        <th>Категория</th>
                        <th>Дата</th>
                        <th>Автор</th>
                    </tr>
                </thead>
                <tbody>
                    {props.items.map(item => (
                        <tr key={item.id}>
                            <td>{item.title}</td>
                            <td>{item.category}</td>
                            <td>{item.date}</td>
                            <td>{item.author}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {props.items.length === 0 && <p>Пользовательских новостей пока нет.</p>}
        </section>
    );
}

function EconomicsPage() {
    return (
        <section>
            <PageBanner
                src="/Cross-platform-software-development/DZ/frontend/images/economics.webp"
                alt="Новости экономики"
            />
            <h2 id="main-title">Новости экономики</h2>
            <p>Это страница экономики. Здесь вы найдете последние новости о курсах валют, изменениях в экономике и финансовых прогнозах.</p>
            <h3>Развитие малого бизнеса</h3>
            <p>Предприниматели всё чаще используют интернет-магазины и электронные площадки для продажи товаров. Такой формат помогает небольшим компаниям находить покупателей в разных регионах и сокращать расходы на аренду торговых помещений.</p>
            <p>Для дальнейшего развития бизнеса важны удобные способы оплаты, быстрая доставка и качественная поддержка клиентов. Эти факторы напрямую влияют на доверие покупателей и количество повторных заказов.</p>
            <h3>Производители расширяют выпуск отечественной продукции</h3>
            <p>Предприятия обновляют оборудование и увеличивают объёмы производства товаров повседневного спроса. Часть компаний направляет дополнительные средства на автоматизацию и обучение сотрудников.</p>
            <p>Развитие местного производства помогает создавать рабочие места и сокращать время доставки продукции до магазинов. При этом предприятия продолжают уделять внимание качеству сырья и готовых товаров.</p>
            <h3>Безналичная оплата становится привычнее</h3>
            <p>Покупатели активно используют банковские карты, мобильные приложения и систему быстрых платежей. Безналичные способы позволяют быстрее оплачивать покупки как в обычных магазинах, так и через интернет.</p>
            <p>Организации расширяют количество доступных способов оплаты и совершенствуют защиту операций. Пользователям рекомендуют не сообщать посторонним коды подтверждения и данные банковских карт.</p>
            <a className="download-link" href="/Cross-platform-software-development/DZ/frontend/report.pdf" download>Скачать отчет (PDF)</a>
        </section>
    );
}

function CulturePage() {
    return (
        <section>
            <PageBanner
                src="/Cross-platform-software-development/DZ/frontend/images/culture.webp"
                alt="Новости культуры"
            />
            <h2 id="main-title">Новости культуры</h2>
            <p>В городских музеях и выставочных залах проходят экспозиции, посвящённые живописи, фотографии и современному искусству. Посетители могут познакомиться как с известными произведениями, так и с работами молодых авторов.</p>
            <h3>Культурные мероприятия</h3>
            <p>Театры готовят новые постановки, а библиотеки проводят встречи с писателями и открытые лекции. Многие мероприятия рассчитаны на семейное посещение и помогают людям разных возрастов интересно провести свободное время.</p>
            <p>Информацию о расписании, стоимости билетов и правилах посещения рекомендуется заранее уточнять на официальных сайтах учреждений культуры.</p>
            <h3>Библиотека открыла клуб любителей чтения</h3>
            <p>На встречах участники обсуждают классическую и современную литературу, делятся впечатлениями и выбирают книги для следующего месяца. Присоединиться к клубу могут все желающие независимо от возраста и читательского опыта.</p>
            <p>Кроме обсуждений, библиотека планирует проводить встречи с местными авторами и небольшие лекции об истории литературы. Участие в большинстве мероприятий будет бесплатным.</p>
            <h3>Молодые художники подготовили совместную выставку</h3>
            <p>В экспозицию вошли живописные работы, графика и фотографии. Авторы посвятили свои произведения городской среде, природе и повседневной жизни людей.</p>
            <p>Во время выставки посетители смогут пообщаться с художниками и узнать, как создавались представленные работы. Также запланированы творческие занятия для детей и взрослых.</p>
        </section>
    );
}

function AddNewsForm(props) {
    const [message, setMessage] = React.useState("");

    async function submit(values, actions) {
        setMessage("");
        try {
            await api.post("/news", values);
            actions.resetForm();
            setMessage("Новость добавлена");
            props.onAdded();
        } catch (error) {
            setMessage(error.response?.data?.message || "Не удалось добавить новость");
        }
        actions.setSubmitting(false);
    }

    return (
        <section>
            <PageBanner
                src="/Cross-platform-software-development/DZ/frontend/images/c.webp"
                alt="Добавление новости"
            />
            <h2>Добавление новости</h2>
            <p>Здесь вы можете добавить свою новость.</p>
            <Formik.Formik
                initialValues={{ title: "", category: "Экономика", date: "" }}
                validate={values => {
                    const errors = {};
                    if (!values.title.trim()) errors.title = "Введите название";
                    if (!values.date) errors.date = "Выберите дату";
                    return errors;
                }}
                onSubmit={submit}
            >
                {({ errors, touched, isSubmitting }) => (
                    <Formik.Form className="form">
                        <label htmlFor="title">Название</label>
                        <Formik.Field id="title" name="title" />
                        {touched.title && errors.title && <span className="error">{errors.title}</span>}

                        <label htmlFor="category">Категория</label>
                        <Formik.Field id="category" name="category" component="select">
                            <option>Экономика</option>
                            <option>Культура</option>
                            <option>Спорт</option>
                            <option>Город</option>
                            <option>Общество</option>
                            <option>Наука</option>
                            <option>Технологии</option>
                        </Formik.Field>

                        <label htmlFor="date">Дата</label>
                        <Formik.Field id="date" name="date" type="date" />
                        {touched.date && errors.date && <span className="error">{errors.date}</span>}

                        <button type="submit" disabled={isSubmitting}>Добавить</button>
                    </Formik.Form>
                )}
            </Formik.Formik>
            {message && <p className="message">{message}</p>}
        </section>
    );
}

function App() {
    const [username, setUsername] = React.useState(null);
    const [checking, setChecking] = React.useState(true);
    const [section, setSection] = React.useState("home");
    const [news, setNews] = React.useState([]);

    React.useEffect(() => {
        api.get("/auth/me")
            .then(response => setUsername(response.data.username))
            .catch(() => setUsername(null))
            .finally(() => setChecking(false));
    }, []);

    React.useEffect(() => {
        if (username) loadNews();
    }, [username]);

    async function loadNews() {
        try {
            const response = await api.get("/news");
            setNews(response.data);
        } catch (error) {
            if (error.response?.status === 401) setUsername(null);
        }
    }

    async function logout() {
        await api.post("/auth/logout");
        setUsername(null);
        setNews([]);
    }

    if (checking) return <p className="loading">Загрузка...</p>;

    if (!username) {
        return (
            <div className="page">
                <Header />
                <AuthForm onLogin={setUsername} />
            </div>
        );
    }

    return (
        <div className="page">
            <Header username={username} />
            <Navigation section={section} onChange={setSection} onLogout={logout} />
            <main>
                {section === "home" && <HomePage items={news} />}
                {section === "economics" && <EconomicsPage />}
                {section === "culture" && <CulturePage />}
                {section === "add" && (
                    <AddNewsForm
                        onAdded={() => {
                            loadNews();
                            setSection("home");
                        }}
                    />
                )}
            </main>
            <footer>Новостной портал 2026</footer>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
