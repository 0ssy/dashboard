export default function StatCard(props){

    return(

        <div style={{
            width:"220px",
            padding:"30px",
            background:props.color,
            border:"4px solid black",
            borderRadius:"25px"
        }}>

            <h2>{props.title}</h2>

            <br/>

            <h1>{props.value}</h1>

        </div>

    )

}