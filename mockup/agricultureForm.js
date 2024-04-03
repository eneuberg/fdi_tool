const questionOneHTML = `
    <form id="operatingSurplus">
        <p>Operating surplus divided by the land value(%).<br>
        (The measure assumes land values reflect production potential and not other externalities.)  </p>
        <input type="text" name="answer">
        <button type="submit">Submit</button>
    </form>
`;

const questionTwoHTML = `
    <form>
        <p>Complies with AT LEAST ONE of the following: <br>
• Access to or availed credit<br>
• Access to or availed insurance<br>
• Share of a single agricultural commodity less than 66% in the total value of production of the holding</p>
        <input type="checkbox" name="answer">
        <button type="submit">Submit</button>
    </form>
`;

const questionThreeHTML = `
    <form>
        <p>FDI project likely to cause one of the following: <br>
• Soil erosion   <br>
• Reduction in soil fertility<br>
• Salinization of irrigated land <br>
• Waterlogging </p>
        <input type="checkbox" name="answer">
        <button type="submit">Submit</button>
    </form>
`;

const questionFourHTML = `
    <form id="annualGroundwater">
        <p>Annual groundwater abstraction for agriculture by MNE – <br>
        annual groundwater recharge from rainfall = Groundwater balance (m3) (if negative balance add "-")</p>
        <input type="text" name="answer">
        <button type="submit">Submit</button>
    </form>
`;

const questionFiveHTML = `
    <form>
        <p>MNE has history of adhering to the International Code of Conduct on Pesticide Management.</p>
        <input type="checkbox" name="answer">
        <button type="submit">Submit</button>
    </form>
`;

const questionSixHTML = `
    <form>
        <p>Complies with AT LEAST THREE of the following: <br>
• Leaves at least 10% of the holding area for natural or diverse vegetation.<br>
• Farm produces agricultural products that are organically certified, or its products are undergoing the certification process.<br>
• Farm does not use medically important antimicrobials as growth promoters.<br>
• At least two of the following contribute to farm production: <br>
1) temporary crops, <br>
2) pasture, <br>
3) permanent crops, <br>
4) trees on farm, <br>
5) livestock or animal products, and <br>
6) aquaculture.<br>
• Practices crop or crop/pasture rotation involving at least 2 crops or crops and pastures on at least 80% of the farm cultivated area (excluding permanent crops and permanent pastures) over a period of 3 years. <br>
In case of a 2-crop rotation, the 2 crops must be from different plant genus, e.g., a grass plus a legume, or a grass plus a tuber etc. <br>
• Livestock includes locally adapted breeds. 
</p>
        <input type="checkbox" name="answer">
        <button type="submit">Submit</button>
    </form>
`;

const questionSevenHTML = `
    <form>
        <p>Project offers paid maternity and paternity leave to its workers</p>
        <input type="checkbox" name="answer">
        <button type="submit">Submit</button>
    </form>
`;

const questionEightHTML = `
    <form>
        <p>Project offers paid maternity and paternity leave to its workers (Y/N)</p>
        <input type="checkbox" name="answer">
        <button type="submit">Submit</button>
    </form>
`;

const questionNineHTML = `
    <form>
        <p>Company has internal mechanisms and legislation in place to ensure flexible working and gender equality? <br>
        (Offers flexible working arrangements or safe transportation to working facilities, male/female night shift ratio is balanced, offers or supports daycare/childcare, addresses sexual harrassment, gender appropriate workgear)</p>
        <input type="checkbox" name="answer">
        <button type="submit">Submit</button>
    </form>
`;

const questionTenHTML = `
    <form>
        <p>Company business models and orients towards female well-being externally? (publicizes CRS reports; products and services targeting women; external partnerships or charity)</p>
        <input type="checkbox" name="answer">
        <button type="submit">Submit</button>
    </form>
`;

const questionElevenHTML = `
    <form>
        <p>Project procures from the local base economy where possible and feasible</p>
        <input type="checkbox" name="answer">
        <button type="submit">Submit</button>
    </form>
`;

const questionTwelveHTML = `
    <form>
        <p>MSME contributes to local labour force upskilling to ensure local employment opportunities across the value chain (Y/N)</p>
        <input type="checkbox" name="answer">
        <button type="submit">Submit</button>
    </form>
`;

const questionThirteenHTML = `
    <form>
        <p>
MSME making notable advances towards adapting renewable energy or net zero emissions?
</p>
        <input type="checkbox" name="answer">
        <button type="submit">Submit</button>
    </form>
`;

const agricultureQuestions = [
    questionOneHTML,
    questionTwoHTML,
    questionThreeHTML,
    questionFourHTML,
    questionFiveHTML,
    questionSixHTML,
    questionSevenHTML,
    questionEightHTML,
    questionNineHTML,
    questionTenHTML,
    questionElevenHTML,
    questionTwelveHTML,
    questionThirteenHTML
];