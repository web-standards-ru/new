import React from 'react';

const Footer = () => (
    <footer className="footer">
        <p>2018 © Веб-стандарты</p>
        <div className="footer__social">
            <a
                className="social__link social__link--twitter"
                href="https://twitter.com/webstandards_ru"
            >
                <span className="social__text">Твиттер</span>
            </a>
            <a
                className="social__link social__link--vk"
                href="https://vk.com/webstandards_ru"
            >
                <span className="social__text">ВКонтакте</span>
            </a>
            <a
                className="social__link social__link--github"
                href="https://github.com/web-standards-ru"
            >
                <span className="social__text">Гитхаб</span>
            </a>
            <a
                className="social__link social__link--facebook"
                href="https://fb.com/webstandardsru"
            >
                <span className="social__text">Фейсбук</span>
            </a>
            <a
                className="social__link social__link--youtube"
                href="https://www.youtube.com/webstandards_ru"
            >
                <span className="social__text">Ютуб</span>
            </a>
            <a
                className="social__link social__link--slack"
                href="http://slack.web-standards.ru"
            >
                <span className="social__text">Слак</span>
            </a>
            <a
                className="social__link social__link--telegram"
                href="https://telegram.me/webstandards_ru"
            >
                <span className="social__text">Телеграм</span>
            </a>
        </div>
    </footer>
);

export default Footer;
