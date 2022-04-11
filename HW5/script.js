const students = [
    {
        id: 10,
        name: 'John Smith',
        marks: [10, 8, 6, 9, 8, 7, 5, 10]
    },
    {
        id: 11,
        name: 'John Doe',
        marks: [ 9, 8, 7, 6, 7]
    },
    {
        id: 12,
        name: 'Thomas Anderson',
        marks: [6, 7, 10, 8, 7, 9, 8]
    },
    {
        id: 13,
        name: 'Jean-Baptiste Emanuel Zorg',
        marks: [10, 9, 8, 9, 7]
    }
]

const avgMark = averageStudentMark(students[3]);
const avgGroupMark = averageGroupMark(students);
const minMark = minGroupMark(students);
const maxMark = maxGroupMark(students);
const maxCount = maxCountMark(students);
showResult(avgMark, avgGroupMark, minMark, maxMark, maxCount);

function averageStudentMark(student) {
    return (sumMarks(student) / student.marks.length).toFixed(2);
};

function sumMarks(student) {
    return student.marks.reduce((acc, val) => acc + val);
};

function averageGroupMark(students) {
    let allMarks = students.reduce((acc, val) => acc + val.marks, students[0].marks);
    let marks = allMarks.flat();
    alert(marks);

};

function minGroupMark(students) {
    let minMark = 10;
    let avgMark;
    let name;
    students.forEach(val => {
        avgMark = averageStudentMark(val);
        if (avgMark < minMark) {
            minMark = avgMark;
            name = val.name;
        };
    });
    return {minMark: minMark, name: name};
};

function maxGroupMark(students) {
    let maxMark = 0;
    let avgMark;
    let name;
    students.forEach(val => {
        avgMark = averageStudentMark(val);
        if (avgMark > maxMark) {
            maxMark = avgMark;
            name = val.name;
        };
    });
    return {maxMark: maxMark, name: name};
}

function maxCountMark(students) {
    let maxCount = 0;
    let name;
    students.forEach(val => {
        if (val.marks.length > maxCount) {
            maxCount = val.marks.length;
            name = val.name;
        }
    });
    return {maxCount: maxCount, name: name};
};

function showResult(avgMark, avgGroupMark, minMark, maxMark, maxCount) {
    alert(`Average student mark: ${avgMark}; Group average: ${avgGroupMark}; 
    Minimum average mark: ${minMark.minMark}, student ${minMark.name};
    Maximum average mark: ${maxMark.maxMark}, student ${maxMark.name};
    Maximum number of marks: ${maxCount.maxCount}, student ${maxCount.name}`);
};