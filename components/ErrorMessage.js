const ErrorMessage = ({message}) => {
    return ( 
        <div>
           <p className="text-center border border-red-500 w-fit mx-auto p-2 text-red-500 rounded">{message}</p>
        </div>
     );
}
 
export default ErrorMessage;