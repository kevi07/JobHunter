import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema.js'
const sql = neon('postgresql://ai-interview-mocker_owner:Zwnmrlb2ye1t@ep-silent-field-a1t5xhow.ap-southeast-1.aws.neon.tech/ai-interview-mocker?sslmode=require');
export const db = drizzle(sql,{schema});
