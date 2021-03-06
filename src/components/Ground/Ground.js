import Garden from "../Garden/Garden";
import { makeStyles, Button, Link } from "@material-ui/core";
import React, { useContext, useState, useEffect } from "react";
import {UserContext} from '../../contexts/UserContext'
import UserApi from '../../api/UserApi';
import LeaderBoard from "../LeaderBoard/LeaderBoard";
import directionsign from '../../images/directionsign.png'
import PlayerInfoBox from '../UI/PlayerInfoBox';
import SoundControls from "../Sound/SoundControls";
import { SoundControlContext } from "../../contexts/SoundControlContext";

const useStyles = makeStyles({
  ground: {
    height: '60vh',
    position: 'relative',
    backgroundColor: "darkgreen"
  },
  button: {
    position: 'absolute',
    right: '0%',
    top: '.01%',
    cursor: 'pointer',
    width: '10%',
    height: '10%'
  }
});

/**
 * Bottom 60% of screen.
 * Places garden in center of ground.
 * @param {object} props 
 */
const Ground = (props) => {
  const { gameState } = useContext(UserContext);
  const classes = useStyles();
  const [currentBalance, setCurrentBalance] = useState(0);
  const [currentXp, setCurrentXp] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(0);
  const { setStartBgm, bgmAudioHandle, isBgmMuted, setIsBgmMuted } = React.useContext(SoundControlContext);

  useEffect(
    ()=>{
      console.log("Starting music")
      setStartBgm(true);
      setIsBgmMuted(false);
    }, [setStartBgm]
  );

  useEffect(() => {
    const { id } = gameState.user
    UserApi.fetchUserBalanceByID(id).then((data) => {
      setCurrentBalance(data.current_balance)
      setCurrentXp(data.xp)
      setCurrentLevel(data.current_level)
    })
  })

  useEffect(()=>{
    const { id } = gameState.user
    const newLevel = Math.floor(currentXp / 40);
    if (newLevel > currentLevel) {
      const levelObject = {
        user: id,
        current_level: newLevel
      }
      UserApi.addToBalanceByID(id, levelObject);
      setCurrentLevel(newLevel);
    }
    // if (currentXp % 40 === 0 & currentXp !== 0){
    //   const levelObject = {
    //     user: id,
    //     // currentLevel / 40
    //     current_level: currentLevel + 1
    //   }
    //   UserApi.addToBalanceByID(id, levelObject)
    // }
  }, [currentXp])


  const addMoney = (plantValue, xpValue) => {

    const { id } = gameState.user

    // Fetch current_balance
    UserApi.fetchUserBalanceByID(id)
    .then((data) => {
      // Then add and set new balance
      const addedAmountObject = {
        user: id,
        current_balance: data.current_balance + plantValue,
        xp: data.xp + xpValue,
      }
      console.log(
        `Adding money and xp.
        Previous Balance  : $${data.current_balance}
        Amount to add     : $${plantValue}
        New Total Balance : $${addedAmountObject.current_balance}
        Previous xp   : ${data.xp}
        Amount to add : ${xpValue}
        New Total XP  : ${addedAmountObject.xp}`);

      UserApi.addToBalanceByID(id, addedAmountObject).then((data) => {
        setCurrentBalance(data.current_balance)
        setCurrentXp(data.xp)
        }
      )
    });
  }

  const subtractMoney = (plantValue) => {
    const { id } = gameState.user
    // Fetch current_balance
    UserApi.fetchUserBalanceByID(id)
    .then((data) => {
      // Then subtract and set new balance
      const addedAmountObject = {
        user: id,
        current_balance: data.current_balance - plantValue
      }

      UserApi.addToBalanceByID(id, addedAmountObject).then((data) => {
        setCurrentBalance(data.current_balance)
        }
      )
    });
  }

  const handleLogout = () => {
    if (bgmAudioHandle && !isBgmMuted)
     setIsBgmMuted(true);
    localStorage.removeItem('token');
    props.history.push('/');
  }

  return (
    <div className={classes.ground}>
      {/* User Balance: { currentBalance }
        User XP: { currentXp }
        User Level: { currentLevel } */}
      <Garden 
      addMoney={addMoney}
      subtractMoney={subtractMoney}
      />
      <LeaderBoard/>
      {/* <Button onClick={handleLogout} className={classes.button}>Logout</Button> */}
      <Link className={classes.button} onClick={handleLogout}><img width="100%" alt="logout" src={directionsign} /></Link>
      <PlayerInfoBox
        username={gameState.user.username}
        currentBalance={currentBalance}
        currentXp={currentXp}
        currentLevel={currentLevel}
      />
      <SoundControls />
    </div>
  )
};

export default Ground;
