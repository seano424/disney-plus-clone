import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import {
  selectUserName,
  setUserLogin,
  setSignOut,
} from '../features/user/userSlice'
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth'
import { useDispatch } from 'react-redux'

function Header() {
  const provider = new GoogleAuthProvider()
  const auth = getAuth()
  const dispatch = useDispatch()
  const username = useSelector(selectUserName)
  const history = useHistory()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUserLogin({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          })
        )
        history.push('/')
      }
    })
  }, [auth, dispatch, history])

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        // The signed-in user info.
        const user = result.user
        console.log('user:', user, 'token:', token)
        dispatch(
          setUserLogin({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          })
        )
        history.push('/')
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.email
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)
        console.log(errorCode, errorMessage, email, credential)
      })
  }

  const signUserOut = () => {
    const auth = getAuth()
    signOut(auth)
      .then(() => {
        dispatch(setSignOut())
        history.push('/')
      })
      .catch((error) => {
        // An error happened.
        console.log(error)
      })
  }

  return (
    <Nav>
      <Logo src="/images/logo.svg"></Logo>
      <NavMenu>
        <a href="/">
          <img src="/images/home-icon.svg" alt="" />
          <span>HOME</span>
        </a>
        <a href="/">
          <img src="/images/search-icon.svg" alt="" />
          <span>SEARCH</span>
        </a>
        <a href="/">
          <img src="/images/watchlist-icon.svg" alt="" />
          <span>WATCHLIST</span>
        </a>
        <a href="/">
          <img src="/images/original-icon.svg" alt="" />
          <span>ORIGINALS</span>
        </a>
        <a href="/">
          <img src="/images/movie-icon.svg" alt="" />
          <span>MOVIES</span>
        </a>
        <a href="/">
          <img src="/images/series-icon.svg" alt="" />
          <span>SERIES</span>
        </a>
      </NavMenu>
      {username ? (
        <UserImg
          onClick={signUserOut}
          src="https://lh3.googleusercontent.com/ogw/ADea4I7nqXZv5r0QB1-m3tNBpx3wbrFvQh6TEhgmKRAuRA=s64-c-mo"
        />
      ) : (
        <Login onClick={signIn}>Login</Login>
      )}
    </Nav>
  )
}

export default Header

const Nav = styled.div`
  height: 70px;
  background: #090b13;
  display: flex;
  align-items: center;
  padding: 0 36px;
  overflow-x: hidden;
`

const Logo = styled.img`
  width: 80px;
`

const NavMenu = styled.div`
  display: flex;
  flex: 1;
  margin-left: 25px;
  align-items: center;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;

    img {
      height: 20px;
    }

    span {
      font-size: 13px;
      letter-spacing: 1.42px;
      position: relative;

      &:after {
        content: '';
        height: 2px;
        background: white;
        position: absolute;
        left: 0;
        right: 0;
        bottom: -6px;
        opacity: 0;
        transform-origin: left center;
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        transform: scaleX(0);
      }
    }
    &:hover {
      span:after {
        transform: scaleX(1);
        opacity: 1;
      }
    }
  }
`

const UserImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
`

const Login = styled.div`
  cursor: pointer;
  border: 1px solid #f9f9f9;
  padding: 8px 16px;
  border-radius: 4px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  background-color: (0, 0, 0, 0.6);
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`
