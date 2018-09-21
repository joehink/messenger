import React, { Component } from "react";
import { connect } from "react-redux";

class Nav extends Component {
    renderContent() {
        const { user } = this.props;
        if (user) {
            return [
                <a key="1" className="nav-link" href="/api/user/logout">Logout</a>,
                <span key="2" className="nav-text">{ user.firstName }</span>
            ]
        } else {
            return (
                <a className="google-button" href="/auth/google">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAVdSURBVGhD7ZlrUFRlGMfPOcssH2waR0tFiMGckMEJnKAUNjBuJgqCFzInE8QmVG7qmDAruCJ3EVyIuEhyqSGM4bY3FmWKBUVrcLp9akKbpM+lgICVPG/voXdphffILnsW9wP/md8H5rzP8/yffW9nWWZRi1rUwgkUUk90ii2AI9x1OMANwT72T9jNjvGgd9gH8D73OyRw/XCcLUIKqQcJsw8hBeMKqZIm2MuOokAGoQAzwWMhhh2GZMkVkDNOJN3CC3IYZ0jEn3woA1SjFsDnwDPVB7nMSpJ+YQQfST6GLcwkzZQ1wFZ2Ei+7ElLGdkLnmVUQz92hmRATiOMG8ZJdSsqKKzgnXQd78KalFLYFeP+MiN4MfxpBNPsXraCtwPtPS8qLI1TNvIA/nQWbCR7Rm+AFB7lfacWeylv/LQ04xN3Bp9EA+pC7DXHsXf64RZsp402wTRP4dKIVE4LfQ/hOqYZixpmkmCU4zayFFEkVXqoTs+Jt0kQB4wLbWLOOWHibwcempAI1MxISPqfwRnaYaojcQzZpghfUOFxG4SzVuCn49WMcMh1kJMxiwWmHQJQqqSd/iivUwywFg+MI6pQiFM9RG+DhlwdeKi+RMPsT9DomoV5HNIUBk+swtYGfaCIMv1ZkOfiREPsUno1vpxsx8gWenaj/lxq/J8hw+xT0L1mBG4FZjfBcxSRyCHay45Zs7GciZJDGUJswAT6TppDhZklRlbZfDLIqT0YVXUpaU1qa/DxJLSw8G3k080bw/vkHbjLLyHCz5HTqJyQmHxQrb5DUwsJmm2eaNwUM0rmTzBDNjDXsKqy9R1ILC3qlfbQGjOAZaSRDzRbNjDVsyW5+QFILCxv9ntaAEfy8mAw1WzQz1hCYpRonqYWFjX5Ha8CIPTQSYF4j9r+0QrNb5l5a2Kzdb/bdBXVDJLWw8CeeS2vACH7+zI/fg8Vl/SS1sOa6EH/+aiWq13tdJMPNEu1yEyL+gvIWzbwpGZXp+SS1sKDvuReFXlHU19xRdMcOdFgVOt6MxH9FUSgUHH8i0cwbcUn7AVVWJriRkKcL74NvTBuYMCxBhbqNKKI9ehql1reGDBdNx8uyL9PMmxKc0zJChs8tvA8SjU0Mfb0cHVaHPtEEz7vt26C50/NNEmK15BXyTR6nrwPNvCmJpQVXSMjcIl+shg3da9CejohZTRhJUIVN1Lavt/qLVX5lqpssSzNBM26Ku7wfKusPCP4/gKov9Z5tNPMz4Ztp7J7/zJyvOSbzP6t9RDM+k7gL5bdImPnS97o6xaq2PqaZn8k+VfikUu9TbckBoEAMd1Hv+2lsa/TjsLwmqnFTPOV9k9mfnJjf7Fd1eitpxoU4qgoZV3b61nR1rRUsWNfjuaq006c2QR06boyLbt2FYkrKqA0YSVQWVpEU89NZjWzQ1Kw5RLVHoSR18GimRnY3R+t3O1vjN5ChlQ0mqUNG+We0mMi2nSiuKhOtTvtxVhNR+Q2/ETvz180ul2XJ2BStuC04VJ+I3NIHppvwz9KNpdTkivO7SV2Xj8cRVcgjWmFbENsYh17N7EG+Z679nVZ2zpvYEEdt3R7uSeqgh7TCtuBEy477GeUZ60l5cdV69eUVWVp/i/eMpZzRyn5pa/NYTsraTlVd3sr3OsInaSasYT/OWaHbYPuf3kyl0bziXKR7wxDTHgE0U5awt3075Os29XV0rFtN0i+8GtSeruX61z4/pgoajqSYFCISH8Mp6qCREt3rTa348iXp7ENNOi/3S3qvnHzdxj65NuDeSfXmP46qgx/ii3IsRR18P10TOJSn8btRod9Q0IDHkrBFLWpRNhfD/AvExD6LqAHXuwAAAABJRU5ErkJggg==" />
                    Sign in with Google
                </a>
            )
        }
    }
    render() {
        return (
            <nav id="nav">
                <a className="nav-brand">Messenger</a>
                <div className="nav-links">
                    { this.renderContent() }
                </div>
            </nav>
        );
    };
};

function mapStateToProps(state) {
    const { user } = state;
    return { user }
}

export default connect(mapStateToProps)(Nav);
