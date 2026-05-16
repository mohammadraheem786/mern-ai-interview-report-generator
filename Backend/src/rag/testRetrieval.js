import retrieveContext
from "./retrieveContext.js";

const test = async () => {

    const queries = [

        "react interview questions for fresher",

        "node.js backend concepts"

    ];

    const results =
        await retrieveContext(
            queries
        );

    console.log(results);

};

test();