export default function ErrorPage({message}){

    return (
    <div className="error">
      <h2>An error occured.</h2>
      <p>{message}</p>
    </div>)
}