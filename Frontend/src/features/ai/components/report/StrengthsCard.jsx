import formatAIText
from "../../../../utils/formatSkill";

const StrengthsCard = ({

    strengths

}) => {

    return (

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">

            <h2 className="text-3xl font-bold mb-6 text-green-400">

                Strengths

            </h2>

            <div className="space-y-4">

                {

                    strengths.map((item, index) => (

                        <div

                            key={index}

                            className="bg-slate-800 rounded-xl p-4 border border-slate-700"
                        >

                            <p className="text-slate-200">

                                {formatAIText(item)}

                            </p>

                        </div>

                    ))

                }

            </div>

        </div>

    );

};

export default StrengthsCard;