import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import { map, get } from 'lodash'
import PropTypes from 'prop-types'
import ReactPaginate from 'react-paginate'

import * as OnlinePlayersActions from '../actions/onlinePlayers'
import * as RealmStatusActions from '../actions/realmStatus'

class OnlinePlayersPage extends React.Component {
	static propTypes = {
		onlinePlayersActions: PropTypes.shape({
			onlinePlayersChangePage: PropTypes.func.isRequired
		}).isRequired,
		realmStatusActions: PropTypes.shape({
			loadRealmStatus: PropTypes.func.isRequired
		}).isRequired,
		onlinePlayers: PropTypes.shape({
			data: PropTypes.array.isRequired
		}).isRequired,
		realmStatus: PropTypes.shape({})
	}

	componentDidMount() {
		this.props.onlinePlayersActions.onlinePlayersChangePage(1)
		this.props.realmStatusActions.loadRealmStatus()
	}

	handlePageChange = ({ selected }) => {
		this.props.onlinePlayersActions.onlinePlayersChangePage(selected)
	}

	render = () => {
		const { realmStatus, onlinePlayers } = this.props

		let uptime = '-'
		const status = get(realmStatus, 'data.status', 'unknown')

		let totalCount = '-'
		let lightFactionOnline = '-'
		let darkFactionOnline = '-'

		if (status == 'online') {
			const startTime = get(realmStatus, 'data.startTime')
			if (startTime) {
				const diff = moment().diff(moment(startTime))
				var duration = moment.duration(diff)

				const days = duration.days(),
					hrs = duration.hours(),
					mins = duration.minutes(),
					secs = duration.seconds()
				uptime = days + ' days ' + hrs + ' hrs ' + mins + ' mins ' + secs + ' sec'
			}

			totalCount = get(realmStatus, 'data.onlineCount', '-')
			lightFactionOnline = get(realmStatus, 'data.lightFactionOnline', '-')
			darkFactionOnline = get(realmStatus, 'data.darkFactionOnline', '-')
		}

		let updated = get(realmStatus, 'data.updatedAt', moment())
		const diff = moment().diff(moment(updated))
		updated = Math.floor(moment.duration(diff).asSeconds()) + ' seconds ago'


		let players = null
		if (get(onlinePlayers, 'loading', false)) {
			players = (
				<tr>
					<td colSpan="2">
						<div className="loading style-2"><div className="loading-wheel"></div></div>
					</td>
				</tr>
			)
		} else {
			players = map(get(onlinePlayers, 'data', []), (player) => {
				return (
					<tr key={player.id + '-player'}>
						<td>{player.name}</td>
						<td>{player.faction == 1 ? 'Light' : 'Dark'}</td>
					</tr>
				)
			})
		}

		return (
			<div className="page-container online-players-page">
				<div className="container">
					<div className="row">
						<div className="col-lg-3 col-md-2"></div>
						<div className="col-lg-6 col-md-8">
							<h1>Server status</h1>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-2 col-md-1"></div>
						<div className="col-lg-8 col-md-10">
							<table>
								<tbody>
									<tr>
										<td>
											Realm name: {get(realmStatus, 'data.realmName', '-')}
										</td>
									</tr>
									<tr>
										<td>
											Status: {get(realmStatus, 'data.status', '-')}
										</td>
									</tr>
									<tr>
										<td>
											Total players: {totalCount}
										</td>
									</tr>
									<tr>
										<td>
											Light players: {lightFactionOnline}
										</td>
									</tr>
									<tr>
										<td>
											Dark players: {darkFactionOnline}
										</td>
									</tr>
									<tr>
										<td>
											Uptime: {uptime}
										</td>
									</tr>
									<tr>
										<td>
											Updated: {updated}
										</td>
									</tr>
								</tbody>

							</table>
						</div>
					</div>
				</div>
				{status == "online" && <div className="container">
					<div className="row">
						<div className="col-lg-3 col-md-2"></div>
						<div className="col-lg-6 col-md-8">
							<h1>Online players</h1>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-2 col-md-1"></div>
						<div className="col-lg-8 col-md-10">
							<table>
								<thead>
									<tr>
										<th>Name</th>
										<th>Faction</th>
									</tr>
								</thead>
								<tbody>
									{players}
								</tbody>
								<tfoot>
									<tr>
										<td colSpan={3}>
											{!get(onlinePlayers, 'loading', false) && get(onlinePlayers, 'pages', 0) > 1 && <ReactPaginate
												pageCount={get(onlinePlayers, 'pages', 0)}
												pageRangeDisplayed={5}
												marginPagesDisplayed={2}
												forcePage={get(onlinePlayers, 'page', 1)}
												onPageChange={this.handlePageChange}
												containerClassName="pagination"
											/>}
										</td>
									</tr>

								</tfoot>
							</table>
						</div>
					</div>
				</div>}
			</div>
		)
	}

}

const mapStateToProps = state => ({
	onlinePlayers: state.onlinePlayers,
	realmStatus: state.realmStatus
})

const mapDispatchToProps = dispatch => ({
	onlinePlayersActions: bindActionCreators(OnlinePlayersActions, dispatch),
	realmStatusActions: bindActionCreators(RealmStatusActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(OnlinePlayersPage)
