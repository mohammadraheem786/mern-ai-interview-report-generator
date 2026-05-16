const QuestionsCard = ({

    title,
    questions = [],
    type = "technical"

}) => {

    const getBadgeColor = (difficulty) => {

        switch (difficulty?.toLowerCase()) {

            case "easy":
                return "bg-green-500/20 text-green-300 border-green-500/30";

            case "medium":
                return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";

            case "hard":
                return "bg-red-500/20 text-red-300 border-red-500/30";

            default:
                return "bg-slate-500/20 text-slate-300 border-slate-500/30";

        }

    };

    return (

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">

            {/* Header */}

            <div className="flex items-center justify-between mb-8">

                <h2 className="text-3xl font-bold">

                    {title}

                </h2>

                <span className="text-slate-400 text-sm">

                    {questions.length} Questions

                </span>

            </div>

            {/* Empty State */}

            {

                questions.length === 0 ? (

                    <div className="text-slate-500">

                        No questions available

                    </div>

                ) : (

                    <div className="space-y-5">

                        {

                            questions.map((item, index) => (

                                <div

                                    key={index}

                                    className="bg-slate-800/70 border border-slate-700 rounded-2xl p-5 hover:border-indigo-500/40 transition-all"

                                >

                                    {/* Top */}

                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">

                                        <h3 className="text-lg font-semibold leading-relaxed text-white">

                                            {item.question}

                                        </h3>

                                        {

                                            type === "technical" && (

                                                <span

                                                    className={`px-3 py-1 rounded-full text-sm border font-medium w-fit ${getBadgeColor(item.difficulty)}`}

                                                >

                                                    {item.difficulty || "Medium"}

                                                </span>

                                            )

                                        }

                                    </div>

                                    {/* Footer */}

                                    <div className="flex items-center gap-3 text-sm text-slate-400">

                                        <span>

                                            AI Generated

                                        </span>

                                        <span>

                                            •

                                        </span>

                                        <span>

                                            Interview Practice

                                        </span>

                                    </div>

                                </div>

                            ))

                        }

                    </div>

                )

            }

        </div>

    );

};

export default QuestionsCard;