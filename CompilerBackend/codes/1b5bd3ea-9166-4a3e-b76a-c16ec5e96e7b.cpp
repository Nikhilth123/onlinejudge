#include <iostream>
#include <vector>
#include <climits> // Required for INT_MIN

int sumOfMaxTwo(const std::vector<int>& arr) {
    if (arr.size() < 2) {
        std::cerr << "Array must have at least two elements.\n";
        return 0;
    }
    int max1 = INT_MIN, max2 = INT_MIN;
    for (int num : arr) {
        if (num > max1) {
            max2 = max1;
            max1 = num;
        } else if (num > max2) {
            max2 = num;
        }
    }
    return max1 + max2;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> arr(n);
    for (int i = 0; i < n; i++) std::cin >> arr[i];

    std::cout << "Sum of the two largest elements: " << sumOfMaxTwo(arr) << std::endl;
    return 0;
}
