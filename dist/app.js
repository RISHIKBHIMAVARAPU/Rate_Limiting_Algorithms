var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ThrotleRule } from "./throttle-rule.js";
import { Bucket_Capacity, Refilling_Capacity } from "./config.js";
import { ThrotleRulesService } from "./throttle-rule-service.js";
import { UserIdentificationService } from "./user-identification-service.js";
// Main function similar to the Java version
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let rule = new ThrotleRule(Bucket_Capacity, Refilling_Capacity);
        let throtleRulesService = ThrotleRulesService.getInstance();
        throtleRulesService.createRule("client1", rule);
        let request = new UserIdentificationService();
        for (let i = 0; i < 100; i++) {
            console.log(request.serveRequest("client1"));
        }
    });
}
main();
