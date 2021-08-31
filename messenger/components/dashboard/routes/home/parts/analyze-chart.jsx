import { memo } from "react";
import { Doughnut } from "react-chartjs-2";

const AnalyzeChart = ({data,options,bgColor,textColors}) => {
    console.log("re mount")
    return (
        <div className="card w-100" style={{backgroundColor:bgColor,color:textColors[0]}}>
            <div className="card-body">
                <h4 className="card-title">Transaction History</h4>
                <div className="aligner-wrapper">
                    <Doughnut
                        data={data}
                        options={options}
                    />
                    <div className="absolute center-content">
                        <h5 className="font-weight-normal text-whiite text-center mb-2 text-white">
                            1200
                        </h5>
                        <p className="text-small text-muted text-center mb-0">
                            Total
                        </p>
                    </div>
                </div>
                <div className="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                    <div className="text-md-center text-xl-left">
                        <h6 className="mb-1">Transfer to Paypal</h6>
                        <p className="text-muted mb-0">07 Jan 2019, 09:12AM</p>
                    </div>
                    <div className="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
                        <h6 className="font-weight-bold mb-0">$236</h6>
                    </div>
                </div>
                <div className="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                    <div className="text-md-center text-xl-left">
                        <h6 className="mb-1">Tranfer to Stripe</h6>
                        <p className="text-muted mb-0">07 Jan 2019, 09:12AM</p>
                    </div>
                    <div className="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
                        <h6 className="font-weight-bold mb-0">$593</h6>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default memo(AnalyzeChart);