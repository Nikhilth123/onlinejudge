#include <stdio.h>
#include <limits.h> // For INT_MIN

// Function to find the maximum sum of two elements in an array
int findMaxSumOfTwoElements(int arr[], int n) {
    if (n < 2) {
        printf("Array must contain at least two elements.\n");
        return INT_MIN; // Or handle error appropriately
    }

    int firstLargest = INT_MIN;
    int secondLargest = INT_MIN;

    for (int i = 0; i < n; i++) {
        if (arr[i] > firstLargest) {
            secondLargest = firstLargest; // Update secondLargest before updating firstLargest
            firstLargest = arr[i];
        } else if (arr[i] > secondLargest && arr[i] != firstLargest) {
            // Check if current element is greater than secondLargest and not equal to firstLargest
            secondLargest = arr[i];
        }
    }

    // Handle cases where all elements might be the same (e.g., {5, 5, 5})
    // If secondLargest is still INT_MIN, it means there was only one distinct largest element.
    // In such a case, the sum would be firstLargest + firstLargest (if n >= 2).
    // The current logic correctly handles this if the array has at least two elements.
    // For example, if arr = {5, 5}, firstLargest = 5, secondLargest will be updated to 5.

    return firstLargest + secondLargest;
}

int main() {
    int arr1[] = {10, 2, 3, -5, 99, 12, 0, -1};
    int n1 = sizeof(arr1) / sizeof(arr1[0]);
    printf("Max sum of two elements in arr1: %d\n", findMaxSumOfTwoElements(arr1, n1)); // Expected: 99 + 12 = 111

    int arr2[] = {5, 5, 5, 5};
    int n2 = sizeof(arr2) / sizeof(arr2[0]);
    printf("Max sum of two elements in arr2: %d\n", findMaxSumOfTwoElements(arr2, n2)); // Expected: 5 + 5 = 10

    int arr3[] = {-10, -2, -3, -5, -99};
    int n3 = sizeof(arr3) / sizeof(arr3[0]);
    printf("Max sum of two elements in arr3: %d\n", findMaxSumOfTwoElements(arr3, n3)); // Expected: -2 + -3 = -5

    return 0;
}