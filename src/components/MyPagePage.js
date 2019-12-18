import React, { useState, useEffect, useContext } from 'react';
import Context from './Context';
import MypagePageChild from './MyPagePageChild.js';
import MyPagePageAddChild from './MyPagePageAddChild.js';
import MyPagePageWaitingChild from './MyPagePageWaitingChild.js';
import { Col, Row, Button } from 'reactstrap';
import logo from '../images/person-icon.png';
import goBackLogo from '../images/goback-icon.png';
import { Login, Populatemychildren } from 'the.rest/dist/to-import';

const MyPagePage = () => {
	const [state, setState] = useContext(Context);
	const [userData, setUserData] = useState({
		name: '', password: '', phone: '', email: '', nationalIdNumber: '', role: '', limit: '', children: [],
		waitingChildren: []
	});

	const [wantToEdit, setWantToEdit] = useState({
		wantToEdit: false
	});
	const [passwordError, setPasswordError] = useState({
		passwordError: false
	});

	useEffect(() => {
		async function loadLoggedInUser() {
			console.log("hej")
			let user = await Login.findOne()
			setUserData({
				...userData, name: user.name, password: user.password, phone: user.phone, email: user.email,
				nationalIdNumber: user.nationalIdNumber, role: user.role, limit: user.limit, children: user.children,_id:user._id,
				waitingChildren:user.waitingChildren
			});
		}
		loadLoggedInUser();
		// eslint-disable-next-line
	}, []);

	async function handleSubmit() {
		let regularx = /^[\w ]+$/;
		if (userData.password.length < 6) { setPasswordError({ passwordError: true }); }
		else if (!regularx.test(userData.password)) { setPasswordError({ passwordError: true }); }
		else {
			setPasswordError({ passwordError: false });
			let user = await Login.findOne();
			user.password = userData.password;
			user.limit = userData.limit;
			user.children = userData.children;
			// if (userData.children.length > 0) {
			// 	let child = await User.findOne({ _id: userData.children[0]._id });
			// 	child.limit = userData.children[0].limit;
			// 	await child.save();
			// }
		
			// await user.save();
			setState({ ...state, user })
			setWantToEdit({ wantToEdit: false });
		}
	}

	const goBackButton = () => {
		setWantToEdit({ wantToEdit: false });
		setPasswordError({ passwordError: false });
	}

	return (
		<div className="mypage-component mt-5">

			<Row className="pb-5">
				<Col>
					{wantToEdit.wantToEdit ?
						<img src={goBackLogo} alt="pil ikon" className="button" onClick={goBackButton}></img> :
						<Button color="info" className="edit-button" onClick={() => setWantToEdit({ wantToEdit: true })}> Redigera </Button>}
				</Col>
			</Row>

			<Row>
				<Col xs={4}>
					<img src={logo} alt="person ikon"></img>
				</Col>
				<Col xs={8} className="user-name">
					{userData.name}
				</Col>
			</Row>

			<Row className="mt-4">
				<Col xs={4}> Telefon </Col>
				<Col xs={8}> {userData.phone} </Col>
			</Row>
			<Row>
				<Col xs={4}> Pers.Nr. </Col>
				<Col xs={8}> {userData.nationalIdNumber} </Col>
			</Row>
			<Row>
				<Col xs={4}> Epost </Col>
				<Col xs={8}> {userData.email} </Col>
			</Row>

			<Row className="mt-1" style={{ height: '40px' }}>
				<Col xs={4} className="password-text"> Lösenord </Col>
				<Col sm={7} xs={8}>
					{wantToEdit.wantToEdit ?
						<input type="password" className="form-control" placeholder="Nytt lösenord" onChange={(e) => setUserData({ ...userData, password: e.target.value })} /> :
						<p className="password-text">********</p>}
				</Col>
			</Row>
			{wantToEdit.wantToEdit && passwordError.passwordError ?
				<div>
					<Row>
						<Col>
							<p className="error-text">! Lösenord måste vara minst sex tecken långt </p>
						</Col>
					</Row>
				</div> : ''}

			<Row className="mt-1">
				<Col xs={4}> Beloppsgräns<br></br>/månad </Col>
				{wantToEdit.wantToEdit ?
					<Col sm={7} xs={8}>
						{userData.role === 'parent' ?
							<input type="number" className="form-control" value={userData.limit || ''} onChange={(e) => setUserData({ ...userData, limit: e.target.value })} /> :
							<div>{userData.limit ? <p>{userData.limit},00 sek</p> : <p className="limit-text">Ingen gräns satt</p>}</div>
						}
					</Col> :
					<Col sm={7} xs={8}>
						{userData.limit ? <p>{userData.limit},00 kr</p> : <p className="limit-text">Ingen gräns satt</p>}
					</Col>
				}
			</Row>

			{userData && userData.children.length > 0 ?
				<div className="mt-4">
					{userData.children.map((child, index) => {
						return (
							<MypagePageChild key={index + 1} child={child} wantToEdit={wantToEdit} userData={userData} setUserData={setUserData} />
						);
					})}
				</div> : ''}

			{userData.waitingChildren && userData.waitingChildren.length > 0 ?
				<div className="mt-4">
					{userData.waitingChildren.map((child, index) => {
						return (
							<MyPagePageWaitingChild key={index + 1} child={child} />
						);
					})}
				</div> : ''}

			{wantToEdit.wantToEdit ?
				<div>
					{userData.role === 'parent' ? <MyPagePageAddChild userData={userData} setUserData={setUserData} /> : ''}
				</div> : ''
			}
			{wantToEdit.wantToEdit ?
				<Row>
					<Col sm={{ size: 6, offset: 3 }} className="mt-3">
						<Button className="saveBtn mx-auto mt-2" onClick={handleSubmit}>Spara</Button>
					</Col>
				</Row> : ''}

		</div>
	);
}
export default MyPagePage;
