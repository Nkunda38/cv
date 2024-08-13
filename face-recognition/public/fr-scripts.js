const run = async () => {
    // Load models
    await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri('./models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
        faceapi.nets.ageGenderNet.loadFromUri('./models'),
    ]);

    // Reference face and faces to check
    const refFace = await faceapi.fetchImage('https://assets.entrepreneur.com/content/3x2/2000/1680813141-GettyImages-850154658copy.jpg');
    const facesToCheck = await faceapi.fetchImage('https://static.timesofisrael.com/www/uploads/2021/11/Image-from-iOS-25.jpg');

    // Detect faces
    let refFaceAiData = await faceapi.detectAllFaces(refFace).withFaceLandmarks().withFaceDescriptors();
    let facesToCheckAiData = await faceapi.detectAllFaces(facesToCheck).withFaceLandmarks().withFaceDescriptors();

    // Get canvas and set dimensions
    const canvas = document.getElementById('canvas');
    faceapi.matchDimensions(canvas, facesToCheck);

    // Create FaceMatcher with reference data
    const labeledDescriptors = refFaceAiData.map(fd => new faceapi.LabeledFaceDescriptors('Michael Jordan', [fd.descriptor]));
    let faceMatcher = new faceapi.FaceMatcher(labeledDescriptors);

    // Resize faces to check results
    facesToCheckAiData = faceapi.resizeResults(facesToCheckAiData, facesToCheck);

    // Draw boxes and labels
    facesToCheckAiData.forEach(face => {
        const { detection, descriptor } = face;
        const label = faceMatcher.findBestMatch(descriptor).toString();
        console.log(label);
        if (label.includes("unknown")) {
            return;
        }
        const options = { label: label, boxColor: 'blue', textColor: 'white' };
        const drawBox = new faceapi.draw.DrawBox(detection.box, options);
        drawBox.draw(canvas);
    });
};

// Call the run function
run();
