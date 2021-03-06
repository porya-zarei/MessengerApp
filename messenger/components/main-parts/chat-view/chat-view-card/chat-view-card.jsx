import ChatViewCardBody from './body/chat-view-card-body'
import ChatViewCardFooter from './footer/chat-view-card-footer'
import ChatViewCardHeader from './header/chat-view-card-header'
import classes from './chatviewcard.module.scss'
import { useState } from 'react'
import HeaderInfo from './header-info/header-info'

const ChatViewCard = () => {
    return ( 
        <>
            <div className={`${classes.cardContainer} bg-secondary overflow-hidden`}>
                <div className={`${classes.card} row p-0 m-0`}>
                    <ChatViewCardHeader/>
                     <HeaderInfo/>
                    <ChatViewCardBody/>
                    <ChatViewCardFooter/>
                </div>
            </div>
        </>
     );
}
 
export default ChatViewCard;