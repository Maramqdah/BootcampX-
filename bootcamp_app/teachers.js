const { Pool } = require('pg');

const pool = new Pool({
    user: 'maramqdah',
    password: '123',
    host: 'localhost',
    database: 'bootcampx'
});

// pool.query(`
// SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
// FROM teachers
// JOIN assistance_requests ON teacher_id = teachers.id
// JOIN students ON student_id = students.id
// JOIN cohorts ON cohort_id = cohorts.id
// WHERE cohorts.name = '${process.argv[2] || 'JUL02'}'
// ORDER BY teacher;
// `)
//     .then(res => {
//         res.rows.forEach(row => {
//             console.log(`${row.cohort}: ${row.teacher}`);
//         })
//     });

const queryString = (`
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name like $1
ORDER BY teacher;
`);
const cohortName = process.argv[2];
const limit = process.argv[3] || 'JUl02';
const values = [`%${cohortName}%`, limit];
pool.query(queryString, values)
    .then(res => {
        res.rows.forEach(row => {
            console.log(`${row.cohort}: ${row.teacher}`);
        })
    });