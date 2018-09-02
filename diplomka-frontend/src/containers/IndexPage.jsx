import React from 'react'
import { Link } from 'react-router-dom'
import { REGISTRATION, LOGIN } from '../utils/routes'

class IndexComponent extends React.Component {

	render = () => {
		return (
			<div className="page-container index-page">
				<div className="container">
					<div className="row">
						<div className="col-lg-3"></div>
						<div className="col-lg-6 intro">
							<p>
								Welcome
							</p>
							<p>to</p>
							<h1>Akalitasia</h1>
						</div>
					</div>
					<div className="row join">
						<div className="col-lg-5">
							<Link to={REGISTRATION}>
								<button className="full-width" data-color="white">
									Sign up
								</button>
							</Link>
						</div>
						<div className="col-lg-2 middle-col">
							or
						</div>
						<div className="col-lg-5">
							<Link to={LOGIN}>
								<button className="full-width" data-color="white">
									Sign in
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		)
	}

}

export default IndexComponent
