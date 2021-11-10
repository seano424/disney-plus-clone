import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router'
import { db } from '../firebase'
import { onSnapshot, doc } from '@firebase/firestore'

function Detail() {
  const { id } = useParams()
  const [movie, setMovie] = useState()

  useEffect(() => {
    onSnapshot(doc(db, 'movies', id), (doc) => {
      if (doc.exists) {
        setMovie(doc.data())
      } else {
        // redirect to home page
      }
    })
  }, [id])

  console.log('movie', movie)

  return (
    <Container>
      {movie && (
        <>
          <Background>
            <img
              src={
                movie
                  ? movie.img
                  : `https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/9D8AEB7DE234898392BFD20E7D9B112B841E920AF9A3F54CCFB966722AFF3461/scale?width=1920&aspectRatio=1.78&format=jpeg`
              }
              alt=""
            />
          </Background>

          <ImageTitle>
            <img
              src={
                movie
                  ? movie.imgTitle
                  : `https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/EF737B93E2F2ABE27C74CBBEB322F18A421E7986129E9989587CEF2295B0447F/scale?width=1344&aspectRatio=1.78&format=png`
              }
              alt=""
            />
          </ImageTitle>
          <Controls>
            <PlayButton>
              <img src="/images/play-icon-black.png" alt="" />
              <span>Play</span>
            </PlayButton>
            <TrailerButton>
              <img src="/images/play-icon-white.png" alt="" />
              <span>Trailer</span>
            </TrailerButton>
            <AddButton>
              <span>+</span>
            </AddButton>
            <GroupWatchButton>
              <img src="/images/group-icon.png" alt="" />
            </GroupWatchButton>
          </Controls>
          <SubTitle>2018 · 7m · Family, Fantasy, Kids, Animation </SubTitle>
          <Description>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non,
            dolorem molestiae rerum repudiandae nulla porro. Optio officia
            voluptates accusantium ad?
          </Description>
        </>
      )}
    </Container>
  )
}

export default Detail

const Container = styled.div`
  min-height: calc(100vh -70px);
  padding: 0 calc(3.5vw + 5px);
  position: relative;
`

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  opacity: 0.8;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const ImageTitle = styled.div`
  height: 30vh;
  min-height: 170px;
  width: 35vw;
  min-width: 200px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

const Controls = styled.div`
  display: flex;
  align-items: center;
`

const PlayButton = styled.button`
  border-radius: 4px;
  padding: 0px 24px;
  font-size: 15px;
  display: flex;
  align-items: center;
  height: 56px;
  background-color: rgb(249, 249, 249);
  border: none;
  margin-right: 24.2px;
  letter-spacing: 1.8px;
  cursor: pointer;
  text-transform: uppercase;

  &:hover {
    background: rgb(198, 198, 198);
  }
`

const TrailerButton = styled(PlayButton)`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgb(249, 249, 249);
  color: rgb(249, 249, 249);
`

const AddButton = styled.button`
  border-radius: 50%;
  height: 44px;
  width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.6);
  margin-right: 16px;

  span {
    font-size: 30px;
    color: white;
  }
`

const GroupWatchButton = styled(AddButton)`
  background-color: rgb(0, 0, 0);
`

const SubTitle = styled.div`
  color: rgb(249, 249, 249);
  font-size: 15px;
  margin-top: 26px;
  min-height: 20px;
`

const Description = styled.div`
  line-height: 1.4;
  font-size: 20px;
  margin-top: 16px;
`
