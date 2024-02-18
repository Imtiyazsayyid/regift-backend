import moment from "moment";

export function processOrders(orders) {
  // Initialize an object to store grouped orders
  const groupedOrders = {};

  // Iterate through each order
  orders.forEach((order) => {
    // Get the month and year of the order's creation date
    const monthYear = moment(order.created_at).format("MMMM YYYY");

    // If the monthYear key doesn't exist in groupedOrders, create it
    if (!groupedOrders[monthYear]) {
      groupedOrders[monthYear] = 0;
    }

    // Increment the count of orders for the corresponding monthYear
    groupedOrders[monthYear]++;
  });

  // Convert the groupedOrders object into an array of objects
  const result = Object.keys(groupedOrders).map((key) => ({
    month: key,
    orders: groupedOrders[key],
  }));

  return result;
}

export function getMonthRange() {
  const twelveMonthsAgo = moment().subtract(12, "months").startOf("month");
  const currentMonth = moment().startOf("month");
  const range = [];

  while (currentMonth.isSameOrAfter(twelveMonthsAgo)) {
    range.push(currentMonth.format("MMMM YYYY"));
    currentMonth.subtract(1, "month");
  }

  return range.reverse(); // Reverse the range so that it's in chronological order
}

export function mergeWithRange(monthlyOrders, range) {
  // Create a map from month to orders for quick lookup
  const ordersMap = Object.fromEntries(monthlyOrders.map((item) => [item.month, item.orders]));

  // Merge the existing monthlyOrders with the range
  const result = range.map((month) => ({
    month: moment(month, "MMMM YYYY").format("MMM, YYYY"),
    orders: ordersMap[month] || 0, // If orders exist for the month, use the count; otherwise, set it to 0
  }));

  return result;
}

export function processDonors(donors) {
  // Initialize an object to store grouped orders
  const groupedDonors = {};

  // Iterate through each order
  donors.forEach((order) => {
    // Get the month and year of the order's creation date
    const monthYear = moment(order.created_at).format("MMMM YYYY");

    // If the monthYear key doesn't exist in groupedOrders, create it
    if (!groupedDonors[monthYear]) {
      groupedDonors[monthYear] = 0;
    }

    // Increment the count of orders for the corresponding monthYear
    groupedDonors[monthYear]++;
  });

  // Convert the groupedOrders object into an array of objects
  const result = Object.keys(groupedDonors).map((key) => ({
    month: key,
    donors: groupedDonors[key],
  }));

  return result;
}

export function mergeDonorsWithRange(monthlyDonors, range) {
  // Create a map from month to orders for quick lookup
  const donorsMap = Object.fromEntries(monthlyDonors.map((item) => [item.month, item.donors]));

  // Merge the existing monthlyOrders with the range
  const result = range.map((month) => ({
    month: moment(month, "MMMM YYYY").format("MMM, YYYY"),
    donors: donorsMap[month] || 0, // If orders exist for the month, use the count; otherwise, set it to 0
  }));

  return result;
}

export function procesOrganisations(organisations) {
  // Initialize an object to store grouped orders
  const groupedOrganisations = {};

  // Iterate through each order
  organisations.forEach((order) => {
    // Get the month and year of the order's creation date
    const monthYear = moment(order.created_at).format("MMMM YYYY");

    // If the monthYear key doesn't exist in groupedOrders, create it
    if (!groupedOrganisations[monthYear]) {
      groupedOrganisations[monthYear] = 0;
    }

    // Increment the count of orders for the corresponding monthYear
    groupedOrganisations[monthYear]++;
  });

  // Convert the groupedOrders object into an array of objects
  const result = Object.keys(groupedOrganisations).map((key) => ({
    month: key,
    organisations: groupedOrganisations[key],
  }));

  return result;
}

export function mergeOrganisationsWithRange(monthlyOrganisations, range) {
  // Create a map from month to orders for quick lookup
  const organisationsMap = Object.fromEntries(monthlyOrganisations.map((item) => [item.month, item.organisations]));

  // Merge the existing monthlyOrders with the range
  const result = range.map((month) => ({
    month: moment(month, "MMMM YYYY").format("MMM, YYYY"),
    organisations: organisationsMap[month] || 0, // If orders exist for the month, use the count; otherwise, set it to 0
  }));

  return result;
}

export function procesDonations(donations) {
  // Initialize an object to store grouped orders
  const groupedDonations = {};

  // Iterate through each order
  donations.forEach((order) => {
    // Get the month and year of the order's creation date
    const monthYear = moment(order.created_at).format("MMMM YYYY");

    // If the monthYear key doesn't exist in groupedOrders, create it
    if (!groupedDonations[monthYear]) {
      groupedDonations[monthYear] = 0;
    }

    // Increment the count of orders for the corresponding monthYear
    groupedDonations[monthYear]++;
  });

  // Convert the groupedOrders object into an array of objects
  const result = Object.keys(groupedDonations).map((key) => ({
    month: key,
    donations: groupedDonations[key],
  }));

  return result;
}

export function mergeDonationsWithRange(monthlyOrganisations, range) {
  // Create a map from month to orders for quick lookup
  const donationsMap = Object.fromEntries(monthlyOrganisations.map((item) => [item.month, item.donations]));

  // Merge the existing monthlyOrders with the range
  const result = range.map((month) => ({
    month: moment(month, "MMMM YYYY").format("MMM, YYYY"),
    donations: donationsMap[month] || 0, // If orders exist for the month, use the count; otherwise, set it to 0
  }));

  return result;
}
