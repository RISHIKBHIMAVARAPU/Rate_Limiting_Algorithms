import { ThrotleRule } from "./throttle-rule.js";
import { Bucket_Capacity, Refilling_Capacity } from "./config.js";
import { ThrotleRulesService } from "./throttle-rule-service.js";
import { UserIdentificationService } from "./user-identification-service.js";


async function main() {
  let rule: ThrotleRule = new ThrotleRule(Bucket_Capacity, Refilling_Capacity);
  let throtleRulesService: ThrotleRulesService = ThrotleRulesService.getInstance();

  throtleRulesService.createRule("client1", rule);


  let request: UserIdentificationService = new UserIdentificationService();

  for(let i=0;i<100;i++){
    console.log(request.serveRequest("client1"));
  }
 
}

main();


