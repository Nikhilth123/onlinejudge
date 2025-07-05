import java.util.Arrays;

public class MaxTwoElementsSum {

    public static int findMaxSumSorted(int[] arr) {
        if (arr == null || arr.length < 2) {
            throw new IllegalArgumentException("Array must contain at least two elements.");
        }

        Arrays.sort(arr); // Sorts the array in ascending order
        int n = arr.length;
        return arr[n - 1] + arr[n - 2]; // Sum of the last two elements
    }

    public static void main(String[] args) {
        int[] numbers = {12, 34, 10, 6, 40};
        int maxSum = findMaxSumSorted(numbers);
        System.out.println("Maximum sum of two elements (sorted approach): " + maxSum); // Output: 74
    }
}