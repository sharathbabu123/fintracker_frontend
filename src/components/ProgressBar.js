const ProgressBar = ({ saved, target }) => {
    const percentage = Math.min((saved / target) * 100, 100);
  
    return (
      <div className="w-full bg-gray-300 rounded-full h-5 mt-2">
        <div className="bg-green-500 h-5 rounded-full" style={{ width: `${percentage}%` }}></div>
      </div>
    );
  };
  
  export default ProgressBar;
  