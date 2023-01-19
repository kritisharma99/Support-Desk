import {Link} from "react-router-dom"
import {FaQuestionCircle,FaTicketAlt} from "react-icons/fa"

function Home(){
    return(
        <>
            <section className="heading">
                <h1>
                    What do you needhelp with?
                </h1>
                <p>
                    Please choose from an option below
                </p>   
            </section>
            <Link to="/new-ticket" className="btn btn-reverse">
            <FaQuestionCircle/> Create New Ticket
            </Link>

            <Link to="/tickets" className="btn btn-block">
            <FaTicketAlt/> View Ticket
            </Link>
        </>
    )
}
export default Home