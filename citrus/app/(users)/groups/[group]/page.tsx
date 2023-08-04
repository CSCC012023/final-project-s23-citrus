"use client"
import AblyChatComponent from '@/components/AblyChatComponent'

export default function Home({ params }: { params: { group: string } }) {
    const groupID = params.group.split('-')[0]
    const groupName = params.group.split('-')[1]

    return (
      <div className="container">
  
        <main>
          <h1 className="title">{groupName}</h1>
          <AblyChatComponent channelID={groupID}/>
        </main>
  
        <style jsx>{`
          .container {
            display: grid;
            grid-template-rows: 1fr 100px;
            min-height: 100vh;
            background-color: #eee;
          }
  
          main {
            display: grid;
            grid-template-rows: auto 1fr;
            width: calc(100% - 40px);
            max-width: 900px;
            margin: 20px auto;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0px 3px 10px 1px rgba(0,0,0,0.2);
            background-color: white;
          }
  
          .title {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100px;
            margin: 0;
            color: white;
            background: #005C97;
            background: -webkit-linear-gradient(to right, #363795, #005C97);
            background: linear-gradient(to right, #363795, #005C97);
          }
  
          .logo {
            display: block;
            height: 20px;
            margin: 0.5em;
          }
  
          .svg { 
            fill:#005C97; 
            color:#fff; 
            position: absolute; 
            top: 0; 
            border: 0; 
            right: 0; 
          }
  
          @media (min-width: 600px) {
            .logo {
              height: 40px;
              margin: 1em;
            }
    
            .ably {
              height: 60px;
            }
          }
         
        `}</style>
  
        <style jsx global>{`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
          }
  
          * {
            box-sizing: border-box;
          }
  
          [data-author="me"] {
            background: linear-gradient(to right, #363795, #005C97); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            color: white;
            align-self: flex-end;
            border-bottom-right-radius: 0!important;
            border-bottom-left-radius: 10px!important;
          }
          
        `}</style>
      </div>
    )
  }