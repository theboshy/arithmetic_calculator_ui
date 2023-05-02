import { additionService } from "../addition.service";
import { divisionService } from "../division.service";
import { multiplicationService } from "../multiplication.service";
import { squareRootService } from "../square.root.service";
import { stringGeneratorService } from "../string.generator.service";
import { subtractionService } from "../subtraction.service.";
import { userRecordService } from "../user.record.service";

export const registerServices: Record<string, any> = {
    addition: additionService,
    subtraction: subtractionService,
    division: divisionService,
    multiplication: multiplicationService,
    squareRoot: squareRootService,
    stringGenerator: stringGeneratorService,
    userRecordService: userRecordService
};
