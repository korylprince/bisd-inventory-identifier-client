/*global chrome*/
/*global SEARCH_BASE*/

function openInventoryTab(inventory_number) {
    chrome.tabs.create({url: SEARCH_BASE + inventory_number});
};

export default openInventoryTab;
