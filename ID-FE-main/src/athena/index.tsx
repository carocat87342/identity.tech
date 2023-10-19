export async function Athena (query) {
    const AthenaExpress = require("athena-express"),
    AWS = require("aws-sdk"),
    awsCredentials = {
        region: "us-east-1",
        accessKeyId: "AKIASWJK7FIKYYYF7A54",
        secretAccessKey: "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"
    };

    AWS.config.update(awsCredentials);
    
    const athenaExpressConfig = {
        aws: AWS,
        s3: "s3://identify-reporting/athena-query-results",
        getStats: true
    };
    let result_array = [];
    const athenaExpress = new AthenaExpress(athenaExpressConfig);
    await (async() => {
      let myQuery = {
        sql: query,
        db: "identify",
        getStats: true,
        pagination: 999
      };

      try {
        await athenaExpress.query(myQuery).then((result) => {
          console.log("result", result.Items)
          result_array = result.Items;
        });
      } 
      catch (error) {
        console.log("Error:", error);
      }
    })();
    return result_array;
}
