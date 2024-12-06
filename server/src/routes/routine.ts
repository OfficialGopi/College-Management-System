import { Router } from 'express';
import { deleteRoutine, getRoutineBySemesterAndDept, getRoutineBySubject, postRoutine } from '../controllers/RoutineController.js';

const routine = Router();




routine.get('/teacher', getRoutineBySubject)//teacher by subjects
routine.get('/student/:department/:semester', getRoutineBySemesterAndDept)//student by sem and dept
routine.post('/', postRoutine)//post new routine
routine.delete('/:subjectId/:day/:shift', deleteRoutine)//post new routine









export { routine };