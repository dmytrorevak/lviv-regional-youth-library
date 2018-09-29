import React from 'react';
import {withRouter} from 'react-router';
import {Route} from 'react-router-dom';
import AdminLoadMoreButton from '../../../components/AdminLoadMoreButton';
import AdminAnnouncementList from './AdminAnnouncementList';
import AdminAnnouncementItem from './AdminAnnouncementItem';
import {getAnnouncementsListService} from './adminAnnouncementService';
import {getUpdatedState} from '../../../helpers';

class AdminAnnouncement extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            announcements: [],
            loadMoreUrl: '',
            selectedAnnouncement: null
        };
    }

    componentWillMount() {
        getAnnouncementsListService(this.props.language).then(response => {
            const data = response.data;
            if (response.status === 200) {
                this.setState(getUpdatedState({
                    announcements: data.results,
                    loadMoreUrl: data.next
                }, this.state));
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.language !== this.props.language) {
            getAnnouncementsListService(nextProps.language).then(response => {
                const data = response.data.results;
                if (response.status === 200) {
                    this.setState(getUpdatedState({announcements: data}, this.state));
                }
            });
        }
    }

    handleLoadMoreClick = () => {
        getAnnouncementsListService(this.props.language, this.state.loadMoreUrl).then(response => {
            const data = response.data;
            if (response.status === 200) {
                this.setState(getUpdatedState({
                    announcements: [...this.state.announcements, ...data.results],
                    loadMoreUrl: data.next
                }, this.state));
            }
        });
    }

    render() {
        return (
            <div>
                <Route exact path={`${this.props.match.url}`} render={() => (
                    <div>
                        <AdminAnnouncementList
                            announcements={this.state.announcements}
                        />
                        <AdminLoadMoreButton
                            variant="contained"
                            isDisabled={!this.state.loadMoreUrl}
                            onClick={this.handleLoadMoreClick}
                        />
                    </div>
                )} />
                <Route path={`${this.props.match.url}/:announcementId`} render={() => (
                    <AdminAnnouncementItem language={this.props.language} />
                )} />
            </div>
        );
    }
}

export default withRouter(AdminAnnouncement);
