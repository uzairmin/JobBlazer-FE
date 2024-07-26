export const data = {
    jobs: {
        month: {
            current_count: 10900, // Last 1 - 30 days
            previous_count: 12800, // Last 31 - 60 days
            percentage: 14.84,
            alteration: 'down',
        },
        week: {},
    },
    thriving_source: {
        month: {
            source: 'LinkedIn',
            current_count: 12900, // Last 1 - 30 days
            previous_count: 1200, // Last 31 - 60 days
            percentage: 975,
        },
        week: {},
    },
    // Those are the top 5 tech stacks with increasing job counts in market
    thriving_techs: {
        month: [
            { stack: 'React', current_count: 200, previous_count: 120, percentage: 66.67 },
            { stack: 'Django', current_count: 240, previous_count: 100, percentage: 100 },
            { stack: 'C#', current_count: 140, previous_count: 90, percentage: 55.56 },
            { stack: '.Net', current_count: 140, previous_count: 90, percentage: 55.56 },
            { stack: 'Java', current_count: 340, previous_count: 90, percentage: 277.78 },
        ],
        week: [],
    },
    // Those are the top 5 tech stacks with decreasing job counts in market
    declining_techs: {
        month: [
            { stack: 'Flutter', current_count: 120, previous_count: 200, percentage: 66.67 },
            { stack: 'DevSecOps', current_count: 100, previous_count: 240, percentage: 100 },
            { stack: 'C++', current_count: 90, previous_count: 140, percentage: 55.56 },
            { stack: 'Vuejs', current_count: 90, previous_count: 140, percentage: 55.56 },
            { stack: 'C', current_count: 90, previous_count: 340, percentage: 277.78 },
        ],
        week: [],
    },
    // Those are the top 5 job titles from others or others dev
    emerging_titles: {
        month: [
            { title: 'Hascal Developer', count: 120 },
            { title: 'Java Developer', count: 2305 },
            { title: 'Python ML Developer', count: 90 },
            { title: 'Principal Software Engineer', count: 490 },
            { title: 'Project Manager', count: 390 },
        ],
        week: [],
    },
    // Those are the top 5 job titles
    thriving_titles: {
        month: [
            { title: 'Backend Developer', count: 120 },
            { title: 'Software Developer', count: 235 },
            { title: 'Senior Developer', count: 90 },
            { title: 'Principal Software Engineer', count: 490 },
            { title: 'Java Developer', count: 390 },
        ],
        week: [],
    },
}
